from fastapi.testclient import TestClient
from app.main import app

def test_health():
    with TestClient(app) as client:
        r = client.get('/api/v1/health')
        assert r.status_code == 200
        assert r.json()['status'] == 'ok'

def test_ready_contract():
    with TestClient(app) as client:
        r = client.get('/api/v1/ready')
        assert r.status_code == 200
        assert set(['model_ready', 'checkpoint_sha256_matches', 'classes', 'detail']).issubset(r.json())

def test_reject_invalid_upload():
    with TestClient(app) as client:
        r = client.post('/api/v1/predict', files={'file': ('bad.txt', b'bad', 'text/plain')})
        assert r.status_code == 415
