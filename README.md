# Mod18 CAPSTONE Project: Pro-Tasker Backend Development

Pro-Tasker is a RESTful API for managing users, projects, and tasks. It uses JWT-based authentication and enforces ownership-based authorization to ensure data privacy and integrity.

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [Deployment Steps](#deployment-steps)
  - [Requirements](#requirements)
  - [Create Account](#create-account)
  - [Configure MongoDB](#setup-mongodb)
  - [Render Deployment](#render-deployment-process)
  - [Troubling Shooting](#troubling-shooting)
  - [Additional Notes](#additional-notes)
  - [Local Development](#local-development)
- [Directory](#directory)
- [Features](#features)
- [API References](#api-references)
  - [Legend](#legend)
  - [User Routes](#user-routes)
  - [Project Routes](#project-routes)
  - [Task Routes](#task-routes)
  - [Postman Testing](#test-with-postman)
  - [Examples: Route Testing](#route-testing-examples)
- [Useful Resources](#useful-resources)
- [Acknowledgments](#acknowledgments)

## Overview

This is a capstone project designed to synthesize the skills learned across multiple **Per Scholas** _Software Engineer_ modules. It is designed to plan and execute the development of a real-world, secure, and functional RESTful API from the ground up. Success will require careful planning, clean code, and a solid understanding of authentication and authorization principles.

### Links

- Solution URL: [GitHub: ProTasker Frontend](https://github.com/DblRH600/pro-tasker-frontend/tree/main/src)
- Live Site URL: [Pro Tasker](https://protaskmanaging.netlify.app/)

## Deployment Steps

### Requirements

- Node.js
- Express
- DOTENV
- MongoDB
- Mongoose
- JSONWEBTOKEN
- BCRYPT
- Git
- GitHub Acc
- Render Acc

### Create Account (if necessary)

1. Create a GitHub Acc
   1 - Create a Repopository (Repo)

2. Create a MongoDB Acc

3. Create Render Acc

### Configure MongoDB

1. Create a free cluster on MongoDB Atlas
2. Create a database user and get your connection string
3. Add your IP address to the network access list (or allow all IPs)
4. Update the database name in the connection string

5. Prepare the Application

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Render Deployment Process

1. Log in to Render Dashboard
2. Click the "New +" icon and select "Web Services"
3. Connect the GitHub Repo
4. Configure Service:
   Name: Repo-Name
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   Plan: Free
   Add Environment Variables:

   MONGODB_URI: Your MongoDB connection string
   JWT_SECRET: Your JWT secret key

5. Optional Settings & debugging tips:

   - Wait for the initial deploy to complete
   - Click on the generated domain URL
   - Test all features of your application

   ### Troubleshooting

   - Check Render logs for deployment errors
   - Ensure all environment variables are set correctly
   - Verify MongoDB connection string is correct
   - Check if the build process completes successfully

   ### Additional Notes

   - Free tier may sleep after 15 minutes of inactivity
   - Configure health check endpoint if needed
   - CORS settings should include Render domain
   - Keep sensitive data in environment variables

### Local Development

```bash
npm install
npm run dev
```

## Directory

```
pro-tasker
  backend
    config
      connection.js
    controllers
      projectController.js
      taskController.js
      userController.js
    middleware
      adminOnly.js
    models
      Project.js
      Task.js
      User.js
    routes
      projects.js
      tasks.js
      users.js
    utils
      auth.js
    .env
    .gitignore
    package.json
    server.js
```

## Features

- **Modular Codebase**

  - Organized by `controllers/`, `models/`, `routes/`, and `utils/` for clean code separation of concerns

- **Protected Routes**

  - Users can only access their _own_ projects and tasks

- **User Authentication**

  - Login and registration utilizing _hashed_ passwords
  - JWT-based secure sessions

- **Full CRUD Actions**

## API References

### Legend

- 🔓 = Public (no token required)
- 🔒 = Protected (JWT token required)

### User Routes

| Method | Endpoint              | Description          | Auth |
| ------ | --------------------- | -------------------- | :--: |
| `POST` | `/api/users/register` | Register new user    |  🔓  |
| `POST` | `/api/users/login`    | Login and return JWT |  🔓  |

### Project Routes

| Method   | Endpoint            | Description                | Auth |
| -------- | ------------------- | -------------------------- | :--: |
| `POST`   | `/api/projects`     | Create a new project       |  🔒  |
| `GET`    | `/api/projects`     | Get all projects           |  🔒  |
| `GET`    | `/api/projects/:id` | Get a single project by ID |  🔒  |
| `PUT`    | `/api/projects/:id` | Update a project           |  🔒  |
| `DELETE` | `/api/projects/:id` | Delete a project           |  🔒  |

### Task Routes

| Method   | Endpoint                         | Description                 | Auth |
| -------- | -------------------------------- | --------------------------- | :--: |
| `POST`   | `/api/projects/:projectId/tasks` | Create a task under project |  🔒  |
| `GET`    | `/api/projects/:projectId/tasks` | Get tasks for a project     |  🔒  |
| `PUT`    | `/api/tasks/:taskId`             | Update a task by ID         |  🔒  |
| `DELETE` | `/api/tasks/:taskId`             | Delete a task by ID         |  🔒  |

## Test with Postman

1. Import the API into Postman or create a new collection
2. Register a New User:
   `POST localhost:3000/api/users/register`
   **Request Body**
    ```json
    {
      "name": "username",
      "email": "usen@example.com",
      "password": "securePWD123"
    }
    ```
    **Response**
    ```json
    {
      "token": "JWT_TOKEN",
      "user": {
        "_id": "userId123",
        "name": "Rico Haywood",
        "email": "rico@example.com"
      }
    }
    ```
3. Login:
  `POST localhost:3000/api/users/login` with the saved token
4. Set `Authorization: Bearer <token>` for protected routes on the **Authorization** tab
5. Test/Confirm other **Endpoints**

## Route Testing Examples
***Note:*** When testing routes and requests, be sure to include:
```
Authorization: Bearer <token>
```
- Project Routes:
  ```http
  POST localhost:3000/api/projects
  ```
  **Request Body**
  ```json
  {
    "name": "Pro-Tasker MVP",
    "description": "Initial build of the project management app"
  }
  ```
  **Response**
  ```json
  {
    "_id": "proj123",
    "name": "Pro-Tasker MVP",
    "description": "Initial build of the project management app",
    "owner": "userId123"
  }
  ```

- Task Routes:
  ```http
  POST localhost:3000/api/projects/:projectId/tasks
  ```
  **Request Body**
  ```json
  {
    "title": "Set up backend",
    "description": "Initialize Express server and MongoDB connection",
    "status": "To Do"
  }
  ```
  **Response**
  ```json
  {
    "_id": "task123",
    "title": "Set up backend",
    "description": "Initialize Express server and MongoDB connection",
    "status": "To Do",
    "project": "proj123"
  }
  ```

## Useful resources

- [EXPRESSJS.COM](https://expressjs.com/en/5x/api.html#res.sendFile) - **_expressjs.com_** contains well documented information details about **routes**.

- [MONGOOSE](https://mongoosejs.com/docs/index.html) - **_mongoosejs.com_** can be used to deepen one's understanding about the functionality **mongoose** is capable of performing that can be incorporated into a **server**.

- [REST API Tutorial](https://restfulapi.net/) - **_restfulapi.net_** provides background information and tutroials on how to build web-based **APIs** (_Application Programming Interfaces_).

- [Blog: How to Build a RESTful API Using Node, Express, and MongoDB](https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/)

- [MDN: ROUTES and CONTROLLERS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes)

## Acknowledgments

Abraham Tavarez
Colton Wright
Yusuf Bolden
