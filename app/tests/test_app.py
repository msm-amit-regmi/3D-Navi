import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_home_page():
    """Test that the home page returns a 200 status code and contains expected content."""
    response = client.get("/")
    assert response.status_code == 200
    assert "3D Navi" in response.text
    assert "On-Demand Manufacturing Platform" in response.text
    
    # Check for form elements
    assert "Material:" in response.text
    assert "Surface Treatment:" in response.text
    assert "Plate Width" in response.text
    assert "Hole Diameter" in response.text
    
    # Check for 3D renderer
    assert 'id="renderer"' in response.text
    assert "three.min.js" in response.text

def test_health_check():
    """Test that the health check endpoint returns a 200 status code and the expected response."""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_static_files():
    """Test that static files are served correctly."""
    # Test CSS file
    css_response = client.get("/static/css/styles.css")
    assert css_response.status_code == 200
    assert "text/css" in css_response.headers["content-type"]
    
    # Test JS files
    renderer_js_response = client.get("/static/js/renderer.js")
    assert renderer_js_response.status_code == 200
    assert "text/javascript" in renderer_js_response.headers["content-type"]
    
    form_js_response = client.get("/static/js/form.js")
    assert form_js_response.status_code == 200
    assert "text/javascript" in form_js_response.headers["content-type"]