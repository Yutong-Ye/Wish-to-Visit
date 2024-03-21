from pydantic import BaseModel
from queries.pool import pool
from jwtdown_fastapi.authentication import Token


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    email: str
    password: str


class AccountOut(BaseModel):
    user_id: int
    username: str
    email: str


class AccountToken(Token):
    account: AccountOut


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AuthenticationException(Exception):
    pass


class AccountRepo:
    def record_to_account_out(self, record) -> AccountOutWithPassword:
        account_dict = {
            "user_id": record[0],
            "username": record[1],
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
                            (username,
                            email,
                            hashed_password)
                        VALUES
                            (%s, %s, %s)
                        RETURNING
                        user_id,
                        username,
                        email,
                        hashed_password;
                        """,
                        [
                            user.username,
                            user.email,
                            hashed_password,
                        ],
                    )
                    print("insert worked?")
                    user_id = result.fetchone()[0]
                    print("ID GOTTEN", user_id)
                    return AccountOutWithPassword(
                        user_id=user_id,
                        username=user.username,
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
                        username,
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

    def update(
        self, user_id: int, username: str, email: str, hashed_password: str
    ) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET username = %s, email = %s, hashed_password = %s
                        WHERE user_id = %s
                        RETURNING user_id, username, email, hashed_password;
                        """,
                        [username, email, hashed_password, user_id],
                    )
                    record = db.fetchone()
                    if record:
                        return self.record_to_account_out(record)
        except Exception as e:
            print(f"Failed to update user: {e}")
            return None

    def get_user_by_id(self, user_id: int) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT user_id, username, email, hashed_password
                        FROM users
                        WHERE user_id = %s;
                        """,
                        [user_id],
                    )
                    record = db.fetchone()
                    if record:
                        return self.record_to_account_out(record)
        except Exception as e:
            print(f"Failed to get user by ID: {e}")
            return None
