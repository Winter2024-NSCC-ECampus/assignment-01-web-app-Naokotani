# Example Todo app
This is an example "todo" app that includes spring security using JWT tokens to
handle sessions. The front end is written in React. Users can log on, make an
account, create, read, update and delete TODOs.

## Stack
- Spring: The API uses spring framework. It can be found in the `api/`
directory.

- React: The front end is written in React. It can be found in the `frontend/`
directory. Navigation within the app is handled by react-router-dom.

- Vite: runs the development version of the React front end and builds static
files for the production version. Vite provides HMR (Hot Module Reload) to
improve developer experience.

- Docker: Docker is used to containerize and run the application. It manages
all of the services and coordinates them.

- PostgreSQL: Database for the application. Using the official PostgreSQL and
connecting to it with Spring JPA.

- Nginx: used to server the static production version of the app, and also
proxies to the API in the production version.

## Running the app
The app is fully containerized so you can run it with docker by running `docker
compose up --build`

## Usage
The app will run on several ports after it is started. There is a development
version that will run on `localhost:5173` and A production version that will
run on `localhost:8085`. The database is available on `localhost:5432`. To
connect to the database, reference the password and username in the
`compose.yml` file. Finally, the api can be accessed directly on
`localhost:8081` and a swagger ui can be accessed on
`localhost:8081/swagger-ui/index.html`. Using the swagger-ui you can interact
with the API directly and bypass the React front end, and see the schema for
each end point.
