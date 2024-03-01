import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountRepo, AccountOutWithPassword


class ExampleAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: AccountRepo,
    ):
        return accounts.get(email)

    def get_account_getter(
        self,
        accounts: AccountRepo = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        print("DICT", account)
        return account.__getitem__("hashed_password")


authenticator = ExampleAuthenticator(os.environ["SIGNING_KEY"])
