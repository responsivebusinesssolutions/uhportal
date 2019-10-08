# Uhportal

## Building frontend image

`docker build -t skeleton-frontend .`

## Starting frontend via Docker

`docker run -v ${PWD}:/app -v /app/node_modules -p 4201:4200 --rm -it skeleton-frontend`

The frontend app will be available on: localhost:4201.
