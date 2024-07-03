# Blog Post API

This backend application implements REST API endpoints to handle CRUD operations for blog posts. Each blog post includes a title, content, optional images, and is associated with a single user (author).

## Installation

### Prerequisites

Make sure you have the following installed on your machine:
- Docker
- Node.js
- npm

### Setup

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

https://documenter.getpostman.com/view/30722641/2sA3dxCqpd
       
