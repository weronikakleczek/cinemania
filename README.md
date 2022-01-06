# Cinemania

## About project

TODO

## Local Development

In order to run application, you have to have PostgreSQL Database running locally.
Here is the command you can use to run a Docker container with empty database.
```
docker run -d \
    --name cinemania-db \
    -p 5433:5432 \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=cinemania \
    -e POSTGRES_PASSWORD=password \
    postgres:alpine


docker run -d --name cinemania-db -p 5433:5432 -e POSTGRES_USER=postgres -e POSTGRES_DB=cinemania -e POSTGRES_PASSWORD=password postgres:alpine
```

Here is the command you can use to get inside Postgres from command line(use password 'password' when prompted):
```
docker exec -it cinemania-db psql -U postgres -W postgres
```
Use port 5433 when connecting to this database (in case you have local Postgres on 5432 running).