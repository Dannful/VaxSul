# VaxSul
1. [Recommended IDEs](#recommended-ides)
2. [Running a local dev setup](#running-a-local-dev-setup)
3. [Testing](#testing)

## Recommended IDEs
It is highly advised to use [IntelliJ IDEA](https://www.jetbrains.com/idea/download) for the backend, since its maintainers also develop [Ktor](https://ktor.io/),
the engine behind this project's backend.

## Running a local dev setup

### Manually 
1. Ensure you have [jdk11](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html) installed.
2. Set up a [PostgreSQL](https://www.postgresql.org/download/) instance. If you have [Docker](https://www.docker.com/get-started/) installed, you can run

        docker run -d --pull_policy=always --restart=always -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=vaxsul
3. Inside `vaxsul_backend`, run

        source .env && ./gradlew run
    to start the server at port `8080`.

### Using Docker
1. Inside project root, run

        docker compose up -d

## Testing

### Backend
Inside `vaxsul_backend`, run

    source .env && ./gradlew test

## Building

### Backend
Inside `vaxsul_backend`, run

    ./gradlew buildFatJar
and the JAR file will be generated at `build/libs/app.jar`.