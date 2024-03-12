from fastapi import APIRouter, Depends, Response
from authenticator import authenticator
from typing import Union, List, Optional

from queries.wishes import (
    WishIn,
    WishOut,
    WishRepository,
    Error,
)

# Create a FastAPI router for handling wish-related endpoints
router = APIRouter()


# Endpoint to create a new wish
@router.post("/wishes", response_model=Union[WishOut, Error])
def create_wish(
    wish: WishIn,
    response: Response,
    repo: WishRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.create(wish, user_data["id"])
    except Exception as e:
        print(e)
        response.status_code = 400
        return {"message": "Could not create wish"}


# Endpoint to delete an existing wish
@router.delete("/wishes/{wish_id}", response_model=bool)
def delete_wish(
    wish_id: int,
    response: Response,
    repo: WishRepository = Depends(),
) -> bool:
    try:
        return repo.delete(wish_id)
    except Exception as e:
        print(e)
        response.status_code = 400
        return {"message": "Could not delete wish"}


# Endpoint to retrieve all wishes for the current user
@router.get("/wishes", response_model=Union[List[WishOut], Error])
def get_wishes(
    response: Response,
    repo: WishRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        wishes = repo.get_wishes(user_data["id"])
        return wishes
    except Exception as e:
        print(e)
        response.status_code = 400
        return {"message": "Could not get wishes of user"}


# Endpoint to update an existing wish
@router.put("/wishes/{wish_id}", response_model=Union[WishOut, Error])
def update_wish(
    wish_id: int,
    wish: WishIn,
    response: Response,
    repo: WishRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, WishOut]:
    try:
        return repo.update_wish(wish_id, wish)
    except Exception as e:
        print(e)
        response.status_code = 400
        return {"message": "Could not update wish"}


# Endpoint to retrieve a single wish by its ID
@router.get("/wishes/{wish_id}", response_model=Optional[WishOut])
def get_one_wish(
    wish_id: int,
    response: Response,
    repo: WishRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> WishOut:
    wish = repo.get_one_wish(wish_id)
    if wish is None:
        response.status_code = 404
    return wish
