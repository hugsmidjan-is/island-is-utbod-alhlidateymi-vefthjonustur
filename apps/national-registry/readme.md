# Project API

## Running

To start the API, run the following command:

```bash
yarn start national-registry
```

## Database

Run the docker-compose file to start the database:

```bash
docker compose -f apps/national-registry/docker-compose.yml up
```

Uses Sequelize as the ORM, following commands are mapped to the nx workspace in `project.json`.

### Migrations

Run the migrations to create the tables:

```bash
yarn nx run national-registry:migrate
```

Undo the last migration:

```bash
yarn nx run national-registry:migrate/undo
```

To create a new migration template:

```bash
yarn nx run national-registry:migrate/generate
```

## Database for local development and migrations

### Run the database locally

Make sure you have Docker installed and Docker daemon running and run the following command:

```bash
yarn nx run national-registry:dev-services
```

This will start a local PostgreSQL database running on port 5432 with the following credentials:

```yaml
- POSTGRES_DB=dev_db
- POSTGRES_USER=dev_db
- POSTGRES_PASSWORD=dev_db
```

### Migrations

#### Create a new migration

```bash
yarn nx run national-registry:migrate/generate
```

This creates a new migration file with the name of the user and the current timestamp.
It's recommended to rename the file to something more descriptive.

#### Run migrations

```bash
yarn nx run national-registry:migrate
```

#### Undo migrations

```bash
yarn nx run national-registry:migrate/undo
```

### Seed

Run the following command to seed the database with initial data located in `apps/national-registry/seeders`:

```bash
yarn nx run national-registry:seed
```
