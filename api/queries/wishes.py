from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


# Define an error model to handle error messages
class Error(BaseModel):
    message: str


# Define a model for incoming wish data
class WishIn(BaseModel):
    destination: str
    country: str
    description: str
    planned_date: str  # Assuming this is a string for simplicity
    status: str


# Define a model for outgoing wish data
class WishOut(BaseModel):
    list_id: int
    user_id: int
    destination: str
    country: str
    description: str
    planned_date: str
    status: str


# Define the repository class for handling wish data
class WishRepository:
    # Method to create a new wish
    def create(self, wish: WishIn, user_id: int) -> WishOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                # Insert the new wish into the database
                db.execute(
                    """
                    INSERT INTO wishes(user_id, destination, country,
                    description, planned_date, status)
                    VALUES(%s, %s, %s, %s, %s, %s)
                    RETURNING list_id;
                    """,
                    [
                        user_id,
                        wish.destination,
                        wish.country,
                        wish.description,
                        wish.planned_date,
                        wish.status,
                    ],
                )
                data = db.fetchone()
                list_id = data[0]

                if list_id is None:
                    return None

                # Return the newly created wish with its assigned list_id
                return WishOut(
                    list_id=list_id,
                    user_id=user_id,
                    destination=wish.destination,
                    country=wish.country,
                    description=wish.description,
                    planned_date=wish.planned_date,
                    status=wish.status,
                )

    # Method to retrieve all wishes for a given user
    def get_wishes(self, user_id: int) -> Union[List[WishOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Fetch all wishes belonging to the user
                    db.execute(
                        """
                        SELECT list_id, user_id, destination, country,
                        description, planned_date, status
                        FROM wishes
                        WHERE user_id = %s
                        ORDER BY list_id;
                        """,
                        [user_id],
                    )

                    # Return a list of WishOut objects
                    return [
                        WishOut(
                            list_id=record[0],
                            user_id=record[1],
                            destination=record[2],
                            country=record[3],
                            description=record[4],
                            planned_date=record[5],
                            status=record[6],
                        )
                        for record in db
                    ]

        except Exception as e:
            print(e)
            return Error(message="Could not get wishes of user!!!")

    # Method to update an existing wish
    def update_wish(self, wish_id: int, wish: WishIn) -> Union[WishOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # Fetch the user_id for the given wish
                    db.execute(
                        """
                        SELECT user_id
                        FROM wishes
                        WHERE list_id = %s
                        """,
                        [wish_id],
                    )
                    user_id_data = db.fetchone()
                    if user_id_data is None:
                        return Error(message="Wish not found")

                    user_id = user_id_data[0]

                    # Update the wish with the new data
                    db.execute(
                        """
                        UPDATE wishes
                        SET destination = %s,
                            country = %s,
                            description = %s,
                            planned_date = %s,
                            status = %s
                        WHERE list_id = %s
                        """,
                        [
                            wish.destination,
                            wish.country,
                            wish.description,
                            wish.planned_date,
                            wish.status,
                            wish_id,
                        ],
                    )

                    # Return the updated wish
                    return WishOut(
                        list_id=wish_id,
                        user_id=user_id,
                        destination=wish.destination,
                        country=wish.country,
                        description=wish.description,
                        planned_date=wish.planned_date,
                        status=wish.status,
                    )
        except Exception as e:
            print(e)
            return Error(message="Could not update that wish")


# Method to delete an existing wish
def delete_wish(self, wish_id: int) -> Union[bool, Error]:
    try:
        with pool.connection() as conn:
            with conn.cursor() as db:
                # Delete the wish from the database
                db.execute(
                    """
                    DELETE FROM wishes
                    WHERE list_id = %s
                    """,
                    [wish_id],
                )
        return True
    except Error as e:
        # Handle any errors that occur during the database operation
        print(f"Error deleting wish: {e}")
        return e
    finally:
        # Any necessary cleanup can go here
        pass
