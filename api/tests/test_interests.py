from fastapi.testclient import TestClient
from main import app
from queries.interests import InterestRepo, InterestIn, InterestOut
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": 1, "username": "testuser"}


class FakeInterestRepo:
    def create(self, interest: InterestIn):
        return InterestOut(interest_id=1, **interest.dict())

    def get_all_interests(self):
        return []

    def get_details(self, interest_id: int):
        assert interest_id == 1
        return InterestOut(
            interest_id=1,
            interests="Test Interest",
            hobbies="Test Hobbies",
            perfect_day_description="Test Description",
            children=False,
            pet_picture_url="http://example.com/image.png",
        )

    def update(self, interest_id: int, interest: InterestIn):
        assert interest_id == 1
        return InterestOut(interest_id=1, **interest.dict())

    def delete(self, interest_id: int):
        assert interest_id == 1
        return {"detail": "Interest deleted successfully"}


def test_get_interest_details():
    app.dependency_overrides[InterestRepo] = FakeInterestRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    interest_id_to_get = 1

    url = f"/interests/{interest_id_to_get}"

    response = client.get(url)

    app.dependency_overrides = {}

    assert response.status_code == 200


def test_delete_interest():
    app.dependency_overrides[InterestRepo] = FakeInterestRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    interest_id_to_delete = 1

    response = client.delete(f"/interests/{interest_id_to_delete}")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json()["detail"] == "Interest deleted successfully"


def test_create_interest():
    app.dependency_overrides[InterestRepo] = FakeInterestRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )

    response = client.post(
        "/interests",
        json={
            "interests": "Test Interest",
            "hobbies": "Test Hobbies",
            "perfect_day_description": "Test Description",
            "children": False,
            "pet_picture_url": "http://example.com/image.png",
        },
    )

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert "interests" in response.json()


def test_update_interest():
    app.dependency_overrides[InterestRepo] = FakeInterestRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    interest_id_to_update = 1
    update_data = {
        "interests": "Updated Interest",
        "hobbies": "Updated Hobbies",
        "perfect_day_description": "Updated Description",
        "children": True,
        "pet_picture_url": "http://example.com/updated_image.png",
    }

    response = client.put(
        f"/interests/{interest_id_to_update}", json=update_data
    )

    app.dependency_overrides = {}

    assert response.status_code == 200
    updated_interest = response.json()
    assert updated_interest["interests"] == update_data["interests"]
    assert updated_interest["hobbies"] == update_data["hobbies"]
    assert (
        updated_interest["perfect_day_description"]
        == update_data["perfect_day_description"]
    )
    assert updated_interest["children"] == update_data["children"]
    assert (
        updated_interest["pet_picture_url"] == update_data["pet_picture_url"]
    )
