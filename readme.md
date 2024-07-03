# Blog Post API

This backend application implements REST API endpoints to handle CRUD operations for blog posts. Each blog post includes a title, content, optional images, and is associated with a single user (author).

# Backend Application

## Tools and Frameworks

This backend application leverages the following tools and frameworks:

### Node.js
Node.js is used as the runtime environment for developing the backend server. It provides a robust platform for building scalable and high-performance applications using JavaScript.

### Express.js
Express.js is a minimal and flexible Node.js web application framework that provides a set of features for web and mobile applications. It is used for handling routes, middleware, and server-side logic.

### MongoDB
MongoDB is a NoSQL database used for storing and managing the application's data. It allows for flexible, schema-less data structures, which makes it easy to iterate and scale.

### Docker
Docker is used for containerizing the application, ensuring consistent environments across development, testing, and production. It simplifies deployment and scaling of the application by encapsulating it and its dependencies.

### Redis
Redis is an in-memory data structure store used as a cache to improve the performance of the application by storing frequently accessed data in memory, reducing the load on the MongoDB database.

## Use Cases

- **Node.js and Express.js**: Together, they form the core of the application, handling HTTP requests, defining routes, and implementing business logic.
- **MongoDB**: Acts as the primary database, storing all the application's data, including user information, blog posts, and comments.
- **Docker**: Ensures the application runs in a consistent environment across all stages of development and deployment. It also simplifies dependency management and scaling.
- **Redis**: Provides caching for frequently accessed data such as blog posts, reducing database load and improving response times.


### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vaibhav1710/vimzo-task.git


2. **Create a Environment Variables file in root directory:**
   ```bash
   DATABASE_URL=mongodb://mongo:27017/vizmo_task
   SECRET = your_jwt_secret
   CLOUD_NAME= cloudinary_cloud_name  
   API_KEY=cloudinary_api_key  
   API_SECRET=cloudinary_api_secret

3. **Install Nodejs Dependencies:**
   ```bash
   npm install

4. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build

5. **Run the Server:**
   ```bash
   npm run dev
   

### Usage

 - The server will be running at http://localhost:3000
 - Use API endpoints to interact

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/30722641-8ed98728-279c-414b-9769-2f137002142f?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D30722641-8ed98728-279c-414b-9769-2f137002142f%26entityType%3Dcollection%26workspaceId%3Ddab268f4-03ca-44b0-b588-eabd1d433d2c)

### API Documentation
https://documenter.getpostman.com/view/30722641/2sA3dxCqpd
       
