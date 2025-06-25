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

## Docker

You can run the application using Docker:

```bash
# Build the Docker image
docker build -t 3d-navi .

# Run the container
docker run -p 12000:8000 3d-navi
```

The application will be available at http://localhost:12000

## GitHub Workflows

This repository includes three GitHub workflows:

1. **Pull Request Check**: Automatically checks if the application is running and endpoints are reachable when a pull request is created or updated.

2. **Docker Build and Push**: Automatically builds a Docker image and pushes it to the GitHub Container Registry when changes are pushed to the main branch.

3. **Deploy to AWS Server**: Automatically deploys the application to an AWS server if the Docker build workflow completes successfully. This workflow uses GitHub environment variables for AWS server credentials.

To use the Docker image from GitHub Container Registry:

```bash
docker pull ghcr.io/msm-amit-regmi/3d-navi:latest
docker run -p 12000:8000 ghcr.io/msm-amit-regmi/3d-navi:latest
```

### Deployment

The application is automatically deployed to the AWS server when changes are pushed to the main branch and all tests pass. The deployment workflow:

1. Connects to the AWS server using SSH
2. Stops and removes any existing container
3. Pulls the latest Docker image
4. Runs a new container with the updated image
5. Verifies the deployment by checking if the application is accessible

The deployed application is accessible at: http://[AWS_SERVER_IP]/
