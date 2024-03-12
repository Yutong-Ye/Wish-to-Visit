from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import users, accounts
from authenticator import authenticator
from queries.accounts import (
    AccountRepo,
    AccountToken,
    AccountOut,
    AuthenticationException,
)

app = FastAPI()
app.include_router(users.router)
app.include_router(accounts.router)
app.include_router(authenticator.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/user/{pk}")
async def get_user(
    pk: int,
    accounts: AccountRepo = Depends(),
    _=Depends(authenticator.get_current_account_data),
) -> AccountOut:
    try:
        account = accounts.get_user_by_id(pk)
    except AuthenticationException:
        return HTTPException(status.HTTP_401_UNAUTHORIZED)
    return account


@app.get("/token")
async def get_by_cookie(
    request: Request,
    account_data: dict | None = Depends(
        authenticator.try_get_current_account_data
    ),
    accounts: AccountRepo = Depends(),
    ra=Depends(authenticator.get_current_account_data),
) -> AccountToken:
    print("ra", ra)
    account = await get_user(account_data["id"], accounts=accounts)
    return {
        "access_token": request.cookies[authenticator.cookie_name],
        "type": "Bearer",
        "account": account,
    }
