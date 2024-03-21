from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountRepo,
    DuplicateAccountError,
)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountUpdateForm(BaseModel):
    username: str
    email: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/protected", response_model=bool)
async def check_access(
    request: Request,
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
):
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    print("here hashed_password", hashed_password)
    print("here")
    try:
        print("trying")
        account = repo.create(info, hashed_password)
        print("account from create method", account)
        print("done trying")
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    print("here we are now")
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    print("token", token)
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts/me", response_model=AccountOut)
async def get_current_account(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: AccountRepo = Depends(),
):
    if not account_data:
        raise HTTPException(status_code=404, detail="Account not found")

    email = account_data.get("email")
    if not email:
        raise HTTPException(
            status_code=404, detail="Email not found in account data"
        )

    account_details = repo.get(email)
    if not account_details:
        raise HTTPException(
            status_code=404, detail="Account details not found"
        )

    return AccountOut(
        user_id=account_data["user_id"],
        username=account_data["username"],
        email=account_details["email"],
    )


@router.put("/api/user/{user_id}")
async def update_account(
    user_id: int,
    update_info: AccountUpdateForm,
    repo: AccountRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if not account_data or account_data.get("user_id") != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to update this account.",
        )
    hashed_password = authenticator.hash_password(update_info.password)
    success = repo.update(
        user_id, update_info.username, update_info.email, hashed_password
    )
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account not found."
        )
    return None
