from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    name: str
    email: str
    password: str


class AccountOut(BaseModel):
    user_id: int
    name: str
    email: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountRepo:
    def record_to_account_out(self, record) -> AccountOutWithPassword:
        account_dict = {
            "user_id": record[0],
            "name": record[1],
            "email": record[2],
            "hashed_password": record[3],
        }

        return account_dict

    def create(
        self, user: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        try:
            print("USER", user)
            print("HASHED", hashed_password)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (name,
                            email,
                            hashed_password)
                        VALUES
                            (%s, %s, %s)
                        RETURNING
                        user_id,
                        name,
                        email,
                        hashed_password;
                        """,
                        [
                            user.name,
                            user.email,
                            hashed_password,
                        ],
                    )
                    print("insert worked?")
                    user_id = result.fetchone()[0]
                    print("ID GOTTEN", user_id)
                    return AccountOutWithPassword(
                        user_id=user_id,
                        name=user.name,
                        email=user.email,
                        hashed_password=hashed_password,
                    )
        except Exception:
            return {"message": "Could not create a user"}

    def get(self, email: str) -> AccountOutWithPassword:
        try:
            print("is trying get somehow?")
            print("email", email)
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                        user_id,
                        name,
                        email,
                        hashed_password
                        FROM users
                        WHERE email = %s
                        """,
                        [email],
                    )
                    record = result.fetchone()
                    print("record found", record)
                    if record is None:
                        return None
                    return self.record_to_account_out(record)
        except Exception:
            return {"message": "Could not get account"}

    pass
