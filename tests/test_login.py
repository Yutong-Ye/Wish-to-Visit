from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)


def test_login_success():
    test_data = {"email": "test@test.com", "password": "test"}

    response = client.post("/api/login", json=test_data)

    assert response.status_code == 200
