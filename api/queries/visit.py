from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool
from datetime import date
from fastapi import HTTPException


class Error(BaseModel):
    message: str


class VisitIn(BaseModel):
    visit_name: str
    description: str
    start_date: date
    end_date: date
    picture_url: str


class VisitOut(BaseModel):
    visit_id: int
    visit_name: str
    description: str
    start_date: date
    end_date: date
    picture_url: str


class VisitRepo:
    def create(self, visit: VisitIn) -> VisitOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    INSERT INTO visit
                        (
                            visit_name,
                            description,
                            start_date,
                            end_date,
                            picture_url
                        )
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING visit_id
                    """,
                    [
                        visit.visit_name,
                        visit.description,
                        visit.start_date,
                        visit.end_date,
                        visit.picture_url,
                    ],
                )
                id = db.fetchone()[0]
                return VisitOut(visit_id=id, **visit.dict())

    def get_all_visits(self) -> List[VisitOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            *
                        FROM visit
                        """
                    )
                    return [
                        VisitOut(
                            visit_id=record[0],
                            visit_name=record[1],
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
                status_code=500, detail="Could not get list of visited places"
            )

    def get_details(self, visit_id: int) -> Optional[VisitOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        "SELECT visit_id, "
                        "visit_name, "
                        "description, "
                        "start_date, "
                        "end_date, "
                        "picture_url FROM "
                        "visit WHERE visit_id = %s",
                        [visit_id],
                    )
                    record = db.fetchone()
                    return VisitOut(**record) if record else None
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="Could not get your visit details"
            )

    def update(self, visit_id: int, visit: VisitIn) -> Optional[VisitOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE visit
                        SET visit_name = %s,
                            description = %s,
                            start_date = %s,
                            end_date = %s,
                            picture_url = %s
                        WHERE visit_id = %s
                        """,
                        [
                            visit.visit_name,
                            visit.description,
                            visit.start_date,
                            visit.end_date,
                            visit.picture_url,
                            visit_id,
                        ],
                    )
                    return VisitOut(visit_id=visit_id, **visit.dict())
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="Could not update your visit"
            )

    def delete(self, visit_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM visit
                        WHERE visit_id = %s
                        """,
                        [visit_id],
                    )
                    return True
        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=500, detail="Could not delete your visit"
            )
