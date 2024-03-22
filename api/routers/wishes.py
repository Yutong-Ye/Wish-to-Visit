from fastapi import APIRouter, Depends, Response
from typing import List, Union
from authenticator import authenticator
from queries.wishes import (
    Error,
    WishIn,
    WishOut,
    WishRepo,
)

router = APIRouter()


@router.post("/wishes", response_model=Union[WishOut, Error])
def create_wish(
    wish: WishIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WishRepo = Depends(),
):
    return repo.create(wish, account_data['user_id'])


@router.get("/wishes", response_model=Union[Error, List[WishOut]])
def get_all_wishes(
    repo: WishRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_wishes(account_data['user_id'])


@router.get("/wishes/{wish_id}", response_model=Union[WishOut, Error])
def get_wish_details(
    wish_id: int,
    repo: WishRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[WishOut, Error]:
    return repo.get_details(wish_id)


@router.put("/wishes/{wish_id}", response_model=Union[WishOut, Error])
def update_wish(
    wish_id: int,
    wish: WishIn,
    repo: WishRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, WishOut]:
    return repo.update(wish_id, wish)


@router.delete("/wishes/{wish_id}", response_model=bool)
def delete_wish(
    wish_id: int,
    repo: WishRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(wish_id)

