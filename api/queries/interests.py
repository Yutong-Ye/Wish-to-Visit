from pydantic import BaseModel
from typing import List
from queries.pool import pool
from typing import Union


class Error(BaseModel):
    message: str


class InterestIn(BaseModel):
    interests: str
    hobbies: str
    perfect_day_description: str
    children: bool
    pet_picture_url: str


class InterestOut(BaseModel):
    interest_id: int
    interests: str
    hobbies: str
    perfect_day_description: str
    children: bool
    pet_picture_url: str


class InterestRepo:
    def create(self, interest: InterestIn) -> InterestOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO interests (
                        interests,
                        hobbies,
                        perfect_day_description,
                        children,
                        pet_picture_url
                    )
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING interest_id;
                    """,
                    (
                        interest.interests,
                        interest.hobbies,
                        interest.perfect_day_description,
                        interest.children,
                        interest.pet_picture_url,
                    ),
                )
                interest_id = db.fetchone()[0]
                return InterestOut(interest_id=interest_id, **interest.dict())

    def get_all_interests(self) -> List[InterestOut]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute("SELECT * FROM interests")
                interests = db.fetchall()
                return [
                    InterestOut(
                        interest_id=row[0],
                        interests=row[1],
                        hobbies=row[2],
                        perfect_day_description=row[3],
                        children=row[4],
                        pet_picture_url=row[5],
                    )
                    for row in interests
                ]

    def update(self, interest_id: int, interest: InterestIn) -> InterestOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    UPDATE interests
                    SET interests=%s,
                    hobbies=%s,
                    perfect_day_description=%s,
                    children=%s,
                    pet_picture_url=%s
                    WHERE interest_id=%s
                    RETURNING interest_id;
                    """,
                    (
                        interest.interests,
                        interest.hobbies,
                        interest.perfect_day_description,
                        interest.children,
                        interest.pet_picture_url,
                        interest_id,
                    ),
                )
                db.fetchone()
                return InterestOut(interest_id=interest_id, **interest.dict())

    def delete(self, interest_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                        DELETE FROM interests
                        WHERE interest_id = %s
                        """,
                    [interest_id],
                )
                if db.rowcount == 0:
                    return False
                return True

    def get_details(self, interest_id: int) -> Union[InterestOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT * FROM interests
                        WHERE interest_id = %s
                        """,
                        (interest_id,),
                    )
                    interest = db.fetchone()
                    if interest:
                        return InterestOut(
                            interest_id=interest[0],
                            interests=interest[1],
                            hobbies=interest[2],
                            perfect_day_description=interest[3],
                            children=interest[4],
                            pet_picture_url=interest[5],
                        )
                    else:
                        raise Exception("Interest not found")
        except Exception as e:
            return Error(message=str(e))
