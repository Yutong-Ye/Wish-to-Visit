from fastapi import APIRouter, Depends, Response
from typing import List, Union
from authenticator import authenticator
from queries.visit import (
    Error,
    VisitIn,
    VisitOut,
    VisitRepo,
)

router = APIRouter()


@router.post("/visit", response_model=Union[VisitOut, Error])
def create_visit(
    visit: VisitIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: VisitRepo = Depends(),
):
    return repo.create(visit)


@router.get("/visit", response_model=Union[Error, List[VisitOut]])
def get_all_visits(
    repo: VisitRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_visits()


@router.get("/visit/{visit_id}", response_model=Union[VisitOut, Error])
def get_visit_details(
    visit_id: int,
    repo: VisitRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[VisitOut, Error]:
    return repo.get_details(visit_id)


@router.put("/visit/{visit_id}", response_model=Union[VisitOut, Error])
def update_visit(
    visit_id: int,
    visit: VisitIn,
    repo: VisitRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, VisitOut]:
    return repo.update(visit_id, visit)


@router.delete("/visit/{visit_id}", response_model=bool)
def delete_visit(
    visit_id: int,
    repo: VisitRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    return repo.delete(visit_id)
