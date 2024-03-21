from fastapi.testclient import TestClient
from main import app
from queries.wishes import WishRepo, WishIn, WishOut
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": 1, "username": "testuser"}


class FakeWishRepo:
    def create(self, wish: WishIn):
        return WishOut(wish_id=1, **wish.dict())

    def get_all_wishes(self):
        return []

    def get_details(self, wish_id: int):
        assert wish_id == 1
        return WishOut(
            wish_id=1,
            wish_name="Test Wish",
            description="Test Description",
            start_date="2024-01-01",
            end_date="2024-01-02",
            picture_url="http://example.com/image.png",
        )

    def update(self, wish_id: int, wish: WishIn):
        assert wish_id == 1
        return WishOut(wish_id=1, **wish.dict())

    def delete(self, wish_id: int):
        assert wish_id == 1
        return True


def test_get_all_wishes():
    app.dependency_overrides[WishRepo] = FakeWishRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )

    response = client.get("/wishes")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


def test_get_wish_details():
    app.dependency_overrides[WishRepo] = FakeWishRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    wish_id_to_get = 1

    url = f"/wishes/{wish_id_to_get}"

    response = client.get(url)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "wish_id": 1,
        "wish_name": "Test Wish",
        "description": "Test Description",
        "start_date": "2024-01-01",
        "end_date": "2024-01-02",
        "picture_url": "http://example.com/image.png",
    }


def test_update_wish():
    app.dependency_overrides[WishRepo] = FakeWishRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    wish_id_to_update = 1
    update_data = {
        "wish_name": "Updated Wish",
        "description": "Updated Description",
        "start_date": "2024-01-03",
        "end_date": "2024-01-04",
        "picture_url": "http://example.com/updated_image.png",
    }

    response = client.put(f"/wishes/{wish_id_to_update}", json=update_data)

    app.dependency_overrides = {}

    assert response.status_code == 200
    updated_wish = response.json()
    assert updated_wish["wish_name"] == update_data["wish_name"]
    assert updated_wish["description"] == update_data["description"]
    assert updated_wish["start_date"] == update_data["start_date"]
    assert updated_wish["end_date"] == update_data["end_date"]
    assert updated_wish["picture_url"] == update_data["picture_url"]


def test_delete_wish():
    app.dependency_overrides[WishRepo] = FakeWishRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    wish_id_to_delete = 1

    response = client.delete(f"/wishes/{wish_id_to_delete}")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() is True
