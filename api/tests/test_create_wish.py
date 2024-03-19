from fastapi.testclient import TestClient
from main import app
from queries.wishes import WishRepo, WishIn, WishOut

from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": 1, "username": "testuser"}


class CreateWishQueries:
    def create(self, wish: WishIn):
        return WishOut(
            wish_id=1,
            wish_name=wish.wish_name,
            description=wish.description,
            start_date=wish.start_date,
            end_date=wish.end_date,
            picture_url=wish.picture_url,
        )


class EmptyWishRepository:
    def get(self, wish_id: int):
        assert wish_id == 1
        return WishOut(
            wish_id=1,
            wish_name="Random Wish",
            description="Random Description",
            start_date="2024-01-01",
            end_date="2024-01-31",
            picture_url="default.jpg",
        )


def test_create_wish():
    # Arrange
    app.dependency_overrides[WishRepo] = CreateWishQueries
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    wish = {
        "wish_name": "New Wish",
        "description": "New Description",
        "start_date": "2024-02-01",
        "end_date": "2024-02-28",
        "picture_url": "new.jpg",
    }

    expected = {
        "wish_id": 1,
        "wish_name": "New Wish",
        "description": "New Description",
        "start_date": "2024-02-01",
        "end_date": "2024-02-28",
        "picture_url": "new.jpg",
    }

    # Act
    response = client.post("/wishes", json=wish)
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == expected


def test_get_a_wish():
    # Arrange
    app.dependency_overrides[WishRepo] = EmptyWishRepository
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    wish_id_to_get = 1

    # Act
    response = client.get(f"/wishes/{wish_id_to_get}")
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == {
        "wish_id": 1,
        "wish_name": "Random Wish",
        "description": "Random Description",
        "start_date": "2024-01-01",
        "end_date": "2024-01-31",
        "picture_url": "default.jpg",
    }
