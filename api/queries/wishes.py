from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool
from datetime import date
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class WishIn(BaseModel):
    wish_name: str
    description: str
    start_date: date
    end_date: date
    picture_url: str


class WishOut(BaseModel):
    wish_id: int
    wish_name: str
    description: str
    start_date: date
    end_date: date
    picture_url: str


class WishRepo:
    def create(self, wish: WishIn) -> WishOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO wish
                        (
                            wish_name,
                            description,
                            start_date,
                            end_date,
                            picture_url
                        )
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING wish_id
                    """,
                    [
                        wish.wish_name,
                        wish.description,
                        wish.start_date,
                        wish.end_date,
                        wish.picture_url,
                    ],
                )
                id = db.fetchone()[0]
                return WishOut(wish_id=id, **wish.dict())

    def get_all_wishes(self) -> List[WishOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            *
                        FROM wish
                        """
                    )
                    return [
                        WishOut(
                            wish_id=record[0],
                            wish_name=record[1],
                            description=record[2],
                            start_date=record[3],
                            end_date=record[4],
                            picture_url=record[5],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="Could not get list of wishes"
            )

    def get_details(self, wish_id: int) -> Optional[WishOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        "SELECT wish_id, wish_name, description, start_date, "
                        "end_date, picture_url FROM wish WHERE wish_id = %s",
                        [wish_id],
                    )
                    record = db.fetchone()
                    return WishOut(**record) if record else None
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="Could not get wish details"
            )

    def update(self, wish_id: int, wish: WishIn) -> Optional[WishOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE wish
                        SET wish_name = %s,
                            description = %s,
                            start_date = %s,
                            end_date = %s,
                            picture_url = %s
                        WHERE wish_id = %s
                        """,
                        [
                            wish.wish_name,
                            wish.description,
                            wish.start_date,
                            wish.end_date,
                            wish.picture_url,
                            wish_id,
                        ],
                    )
                    return WishOut(wish_id=wish_id, **wish.dict())
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="Could not update wish"
            )

    def delete(self, wish_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM wish
                        WHERE wish_id = %s
                        """,
                        [wish_id],
                    )
                    return True
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="Could not delete wish"
            )
