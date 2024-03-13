@echo off
set Dockerfile="Dockerfile"
set DockerImage="time2share-ui"

REM Check if Docker image exists
docker images -q %DockerImage% > nul 2>&1
if %errorlevel% neq 0 (
    echo Docker image "%DockerImage%" not found. Building the image.
)

REM Check if Dockerfile exists
if exist %Dockerfile% (
    echo Dockerfile found. Running docker command.
    docker run -p 4201:4200 %DockerImage%
) else (
    echo Dockerfile not found. Please make sure Dockerfile exists in the current directory.
)