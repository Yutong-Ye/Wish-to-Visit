from fastapi import APIRouter, Depends
from authenticator import authenticator
from queries.accounts import AccountOutWithPassword

router = APIRouter()


@router.get("/api/auth/verify")
async def verify_auth(
    _: AccountOutWithPassword = Depends(
        authenticator.try_get_current_account_data
    ),
):
    return {"authenticated": True}


# stretchGoal: set the cookie to a timer
