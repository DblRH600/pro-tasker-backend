# Mod18 CAPSTONE Project: Pro-Tasker Backend Development

Pro-Tasker is a RESTful API for managing users, projects, and tasks. It uses JWT-based authentication and enforces ownership-based authorization to ensure data privacy and integrity.

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [Deployment Steps](#deployment-steps)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Reflections](#reflections)
  - [Useful resources](#useful-resources)
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

### Setup MongoDB

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
```
npm install
npm run dev
```

## Directory
```
pro-tasker/
|-backend/
| |-config
```

### Useful resources

- [EXPRESSJS.COM](https://expressjs.com/en/5x/api.html#res.sendFile) - **_expressjs.com_** contains well documented information details about **routes**.

- [MONGOOSE](https://mongoosejs.com/docs/index.html) - **_mongoosejs.com_** can be used to deepen one's understanding about the functionality **mongoose** is capable of performing that can be incorporated into a **server**.

- [REST API Tutorial](https://restfulapi.net/) - **_restfulapi.net_** provides background information and tutroials on how to build web-based **APIs** (_Application Programming Interfaces_).

- [Blog: How to Build a RESTful API Using Node, Express, and MongoDB](https://www.freecodecamp.org/news/build-a-restful-api-using-node-express-and-mongodb/)

- [MDN: ROUTES and CONTROLLERS](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/routes)

## Acknowledgments
