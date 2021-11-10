# API for creating short URLs

## Stack

- [Express](http://expressjs.com/) and [NodeJS 16.12](https://nodejs.org/docs/latest-v16.x/api/index.html) for the backend.
- [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) for building docker images and containerizing application.

## Quick Start

### Docker 
- Run `npm install` inside project's root directory to install all dependencies.
- Run `npm run docker`. This will pull a mongoDB image and create two containers, one for the nodeJS API and an other for the mongo image, that are under the same network and communicate each other.
- When both containers are up and running, visit http://localhost:8090/api-docs/ to test the API via SWAGGER UI.

*This method needs docker and docker-compose to be installed on the local machine.*


### Local development

- Run `npm install` inside project's root directory to install all dependencies.
- To start the application, run `npm run develop`.
- This will startup a node server on http://localhost:8080, you can test the API via SWAGGER UI on http://localhost:8080/api-docs/.

*In order of the API to be able to write data in DB, you should have mongo 4.x installed on your local machine and be sure that you define in .env file the port that mongo service is running.*

