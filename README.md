# 3D-Navi

3D Navi is an on-demand manufacturing platform for FA parts. This web application allows users to customize a flat plate with a hole and request manufacturing quotes.

## Features

- Interactive 3D visualization of a flat plate with a hole
- Customizable parameters (material, surface treatment, dimensions, etc.)
- Real-time 3D model updates based on user input
- Quote request functionality

## Installation

1. Clone the repository:
```bash
git clone https://github.com/msm-amit-regmi/3D-Navi.git
cd 3D-Navi
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

Start the server with Uvicorn:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 12000 --reload
```

The application will be available at http://localhost:12000

## Running Tests

To run the tests:
```bash
pytest app/tests/
```

## Technologies Used

- FastAPI - Backend web framework
- Three.js - 3D rendering library
- Jinja2 - HTML templating
- Uvicorn - ASGI server
