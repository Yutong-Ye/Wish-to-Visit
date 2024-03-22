from fastapi import APIRouter, Depends, Response
from typing import List, Union
from authenticator import authenticator
from queries.interests import (
    Error,
    InterestIn,
    InterestOut,
    InterestRepo,
)

router = APIRouter()


@router.post("/interests", response_model=Union[InterestOut, Error])
def create_interest(
    interest: InterestIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: InterestRepo = Depends(),
):
    try:
        return repo.create(interest)
    except Exception as e:
        response.status_code = 500
        return Error(message=str(e))


@router.get("/interests", response_model=Union[List[InterestOut], Error])
def get_all_interests(
    response: Response,
    repo: InterestRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.get_all_interests()
    except Exception as e:
        response.status_code = 500
        return Error(message=str(e))


@router.put(
    "/interests/{interest_id}", response_model=Union[InterestOut, Error]
)
def update_interest(
    interest_id: int,
    interest: InterestIn,
    response: Response,
    repo: InterestRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        updated_interest = repo.update(interest_id, interest)
        if updated_interest is None:
            response.status_code = 404
            return Error(message="Interest not found")
        return updated_interest
    except Exception as e:
        response.status_code = 500
        return Error(message=str(e))


@router.delete("/interests/{interest_id}", response_model=Union[dict, Error])
def delete_interest(
    interest_id: int,
    response: Response,
    repo: InterestRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    success = repo.delete(interest_id)
    if not success:
        response.status_code = 404
        return Error(message="Interest not found")
    return {"detail": "Interest deleted successfully"}


@router.get(
    "/interests/{interest_id}", response_model=Union[InterestOut, Error]
)
def get_interest_details(
    interest_id: int,
    response: Response,
    repo: InterestRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        return repo.get_details(interest_id)
    except Exception as e:
        response.status_code = 500
        return Error(message=str(e))
