# Cine Time Service

This project is a server through which you can reserve a seat in the cinema. All bookings are stored in the Google calendar of the Google service account

To access a Google service account, the project uses the google.credentials.json file

To test the service when launching the database, mock data is added to it using the init.sql file

The project also uses the pgAdmin image for convenient database management.

## Launch of the project

To start the project, follow these steps:

```bash
docker-compose build
docker-compose run server yarn
docker-compose up -d
```

## Technologies Used

- **Docker**: A platform for containerizing applications, making deployment and management of applications easier in isolated environments.

- **Nest.js**: A progressive Node.js framework for building powerful and scalable web applications. It defaults to TypeScript and provides efficient dependency management and dependency injection.

- **PostgreSQL with pgAdmin**: PostgreSQL is a powerful open-source relational database, and pgAdmin is a graphical interface for managing PostgreSQL databases.

## Database Structure

### Hall Entity

The `Hall` entity represents a specific hall or theater venue.

| Column | Type         | Description                    |
| ------ | ------------ | ------------------------------ |
| id     | Primary Key  | Unique identifier for the hall |
| name   | VARCHAR(255) | Name of the hall (unique)      |

Relations:

- One `Hall` can have multiple `Seats`
- One `Hall` can host multiple `Sessions`

### Movie Entity

The `Movie` entity represents a movie or film.

| Column | Type         | Description                     |
| ------ | ------------ | ------------------------------- |
| id     | Primary Key  | Unique identifier for the movie |
| name   | VARCHAR(255) | Name of the movie               |
| year   | INTEGER      | Release year of the movie       |

Relations:

- One `Movie` can have multiple `Sessions`

### ReservedSeat Entity

The `ReservedSeat` entity represents a seat reservation for a specific session.

| Column        | Type         | Description                           |
| ------------- | ------------ | ------------------------------------- |
| id            | Primary Key  | Unique identifier for the reservation |
| visitor_email | VARCHAR(255) | Email of the visitor (nullable)       |

Relations:

- Many `ReservedSeats` belong to one `Session`
- Many `ReservedSeats` belong to one `Seat`

### Seat Entity

The `Seat` entity represents a seat within a hall.

| Column | Type        | Description                    |
| ------ | ----------- | ------------------------------ |
| id     | Primary Key | Unique identifier for the seat |
| row    | INTEGER     | Row number of the seat         |
| number | INTEGER     | Seat number within the row     |

Relations:

- One `Seat` belongs to one `Hall`
- One `Seat` can have multiple `ReservedSeats`

### Session Entity

The `Session` entity represents a specific showing of a movie in a hall.

| Column       | Type        | Description                       |
| ------------ | ----------- | --------------------------------- |
| id           | Primary Key | Unique identifier for the session |
| session_date | DATE        | Date of the session               |
| start_time   | TIME        | Start time of the session         |
| end_time     | TIME        | End time of the session           |

Relations:

- One `Session` belongs to one `Hall`
- One `Session` belongs to one `Movie`
- One `Session` can have multiple `ReservedSeats`
