# Task Manager API

## Overview
This is a RESTful API for a task management application, built with Node.js and Express. It uses MongoDB with Mongoose for data persistence and JWT for secure user authentication.

## Features
- **Express.js**: For building robust and scalable RESTful APIs.
- **Mongoose**: Provides an elegant Object Data Modeling (ODM) layer for MongoDB.
- **JSON Web Tokens (JWT)**: For implementing secure, stateless user authentication and authorization.
- **Bcrypt**: For hashing user passwords to ensure data security.
- **Joi**: For powerful schema description and data validation.

## Getting Started
### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/skido600/todotask.git
    ```
2.  Navigate to the server directory:
    ```bash
    cd todotask/server
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the `server` root directory and add the environment variables listed below.

5.  Run the development server:
    ```bash
    npm run dev
    ```

### Environment Variables
You must create a `.env` file in the root of the `server` directory with the following variables:

-   `PORT`: The port on which the server will run.
    -   Example: `PORT=9000`
-   `MONGO_URL`: The connection string for your MongoDB database.
    -   Example: `MONGO_URL=mongodb://localhost:27017/taskmanagerdb`
-   `GENSALT`: The salt rounds for bcrypt password hashing.
    -   Example: `GENSALT=10`
-   `JWT_SEC`: A secret key for signing JSON Web Tokens.
    -   Example: `JWT_SEC=your_strong_and_secret_jwt_key`

## API Documentation
### Base URL
The API endpoints are prefixed relative to the server's base URL.

### Endpoints
#### POST /auth/createuser
Creates a new user account.

**Request**:
```json
{
  "username": "johndoe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
    "success": true,
    "statuscode": 201,
    "message": "User johndoe successfully created",
    "data": null
}
```

**Errors**:
-   `400 Bad Request`: Validation error (e.g., invalid email format, weak password) or if a user with the provided email already exists.

---
#### POST /auth/loginuser
Authenticates a user and returns a JWT.

**Request**:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
    "success": true,
    "statuscode": 200,
    "message": "user Login successfully",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJ1c2VyaWQiOiI2N..."
}
```

**Errors**:
-   `400 Bad Request`: Validation error on email or password.
-   `401 Unauthorized`: Invalid credentials (password does not match).
-   `404 Not Found`: User with the provided email was not found.

---
#### POST /api/create
Creates a new task for the authenticated user. Requires `Authorization: Bearer <token>`.

**Request**:
```json
{
  "description": "Weekly Report",
  "todo": "Finalize the Q2 financial report and send to management."
}
```

**Response**:
```json
{
    "success": true,
    "statuscode": 200,
    "message": "created succesfully",
    "data": {
        "description": "Weekly Report",
        "todo": "Finalize the Q2 financial report and send to management.",
        "authoid": "60d0fe4f5311236168a109ca",
        "_id": "60d0fe4f5311236168a109cb",
        "createdAt": "2023-05-20T14:48:00.000Z",
        "updatedAt": "2023-05-20T14:48:00.000Z"
    }
}
```

**Errors**:
-   `400 Bad Request`: Validation error if `description` or `todo` are missing or too short.
-   `401 Unauthorized`: Authentication token is missing.
-   `403 Forbidden`: Invalid or expired token.

---
#### GET /api/gettodo
Retrieves all tasks for the authenticated user. Requires `Authorization: Bearer <token>`.

**Request**:
No request body required.

**Response**:
```json
{
    "success": true,
    "statuscode": 200,
    "message": "Todos fetched successfully",
    "data": [
        {
            "_id": "60d0fe4f5311236168a109cb",
            "description": "Weekly Report",
            "todo": "Finalize the Q2 financial report and send to management.",
            "createdAt": "20/May/2023 2:48:00 PM",
            "updatedAt": "20/May/2023 2:48:00 PM",
            "authoid": "60d0fe4f5311236168a109ca"
        }
    ]
}
```

**Errors**:
-   `401 Unauthorized`: Authentication token is missing.
-   `403 Forbidden`: Invalid or expired token.

---
#### PUT /api/updatetodo/:id
Updates a specific task for the authenticated user. Requires `Authorization: Bearer <token>`.

**Request**:
```json
{
  "description": "Updated Weekly Report",
  "todo": "The Q2 financial report has been updated with new figures."
}
```

**Response**:
```json
{
    "success": true,
    "statuscode": 200,
    "message": "Todos fetched successfully",
    "data": {
        "_id": "60d0fe4f5311236168a109cb",
        "description": "Updated Weekly Report",
        "todo": "The Q2 financial report has been updated with new figures.",
        "createdAt": "20/May/2023 2:48:00 PM",
        "updatedAt": "20/May/2023 3:15:00 PM",
        "authoid": "60d0fe4f5311236168a109ca"
    }
}
```

**Errors**:
-   `400 Bad Request`: Validation error on `description` or `todo`.
-   `401 Unauthorized`: Authentication token is missing.
-   `403 Forbidden`: Invalid or expired token.
-   `404 Not Found`: Task with the specified ID was not found or does not belong to the user.

---
#### DELETE /api/deletetodo/:id
Deletes a specific task for the authenticated user. Requires `Authorization: Bearer <token>`.

**Request**:
No request body required.

**Response**:
```json
{
    "success": true,
    "statuscode": 200,
    "message": " deleted successfully",
    "data": {
        "_id": "60d0fe4f5311236168a109cb",
        "description": "Updated Weekly Report",
        "todo": "The Q2 financial report has been updated with new figures.",
        "authoid": "60d0fe4f5311236168a109ca",
        "createdAt": "2023-05-20T14:48:00.000Z",
        "updatedAt": "2023-05-20T15:15:00.000Z"
    }
}
```

**Errors**:
-   `401 Unauthorized`: Authentication token is missing.
-   `403 Forbidden`: Invalid or expired token.
-   `404 Not Found`: Task with the specified ID was not found or does not belong to the user.

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)