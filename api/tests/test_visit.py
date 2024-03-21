from fastapi.testclient import TestClient
from main import app
from queries.visit import VisitRepo, VisitIn, VisitOut
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": 1, "username": "testuser"}


class FakeVisitRepo:
    def create(self, visit: VisitIn):
        return VisitOut(visit_id=1, **visit.dict())

    def get_all_visits(self):
        return []

    def get_details(self, visit_id: int):
        assert visit_id == 1
        return VisitOut(
            visit_id=1,
            visit_name="Test Visit",
            description="Test Description",
            start_date="2024-01-01",
            end_date="2024-01-02",
            picture_url="http://example.com/image.png",
        )

    def update(self, visit_id: int, visit: VisitIn):
        assert visit_id == 1
        return VisitOut(visit_id=1, **visit.dict())

    def delete(self, visit_id: int):
        assert visit_id == 1
        return True


def test_get_all_visits():
    app.dependency_overrides[VisitRepo] = FakeVisitRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )

    response = client.get("/visit")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


def test_get_visit_details():
    app.dependency_overrides[VisitRepo] = FakeVisitRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    visit_id_to_get = 1

    url = f"/visit/{visit_id_to_get}"

    response = client.get(url)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "visit_id": 1,
        "visit_name": "Test Visit",
        "description": "Test Description",
        "start_date": "2024-01-01",
        "end_date": "2024-01-02",
        "picture_url": "http://example.com/image.png",
    }


def test_update_visit():
    app.dependency_overrides[VisitRepo] = FakeVisitRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    visit_id_to_update = 1
    update_data = {
        "visit_name": "Updated Visit",
        "description": "Updated Description",
        "start_date": "2024-01-03",
        "end_date": "2024-01-04",
        "picture_url": "http://example.com/updated_image.png",
    }

    response = client.put(f"/visit/{visit_id_to_update}", json=update_data)

    app.dependency_overrides = {}

    assert response.status_code == 200
    updated_visit = response.json()
    assert updated_visit["visit_name"] == update_data["visit_name"]
    assert updated_visit["description"] == update_data["description"]
    assert updated_visit["start_date"] == update_data["start_date"]
    assert updated_visit["end_date"] == update_data["end_date"]
    assert updated_visit["picture_url"] == update_data["picture_url"]


def test_delete_visit():
    app.dependency_overrides[VisitRepo] = FakeVisitRepo
    app.dependency_overrides[authenticator.get_current_account_data] = (
        fake_get_current_account_data
    )
    visit_id_to_delete = 1

    response = client.delete(f"/visit/{visit_id_to_delete}")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() is True
