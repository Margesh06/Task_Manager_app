
# Task Management Web App

## Objective
This project aims to build a Task Management Web Application that allows users to manage their tasks efficiently.

## Features

### 1. User Authentication
- **Registration**: Users can create an account by providing their username, email, and password.
- **Login**: Users can login using their credentials.
- **JWT Authentication**: The app uses JSON Web Tokens (JWT) for secure authentication.

### 2. Task Management
- **Create Tasks**: Users can create new tasks by providing a title and description.
- **Update Tasks**: Users can update the title and description of their tasks.
- **Delete Tasks**: Users can delete tasks they no longer need.
- **Mark Tasks as Completed**: Users can mark tasks as completed.
- **Filter Tasks**: Users can filter tasks by their status (completed or pending).
- **Search Tasks**: Users can search tasks by their title or description.

### 3. Frontend
- **Framework**: The frontend is built using React.js.
- **Pages**:
    - **Home/Login Page**: Contains a login form for users to log in to the app.
    - **Registration Page**: A form to allow users to register an account.
    - **Dashboard**: Displays tasks with options to add, update, delete, mark as completed, filter tasks, and search.
- **Design**: The user interface is responsive and user-friendly. Material-UI is used to style the application.

### 4. Backend
- **Framework**: The backend is built using Node.js and Express.js.
- **Database**: MongoDB is used to store user data and task data.
- **API Endpoints**:
    - `POST /api/register`: User registration.
    - `POST /api/login`: User login.
    - `POST /api/tasks`: Create a new task.
    - `PUT /api/tasks/:id`: Update an existing task.
    - `DELETE /api/tasks/:id`: Delete a task.
    - `PATCH /api/tasks/:id`: Mark a task as completed.
    - `GET /api/tasks`: Fetch tasks with filtering and searching options.

### 5. Deployment
- **Cloud Platform**: The application is deployed on a cloud platform (Backend on Render and Frontend on Netlify).

## Requirements

### 1. Functionality
- All required features are implemented and working correctly.
  
### 2. Code Quality
- Clean, well-structured, and well-documented code.

### 3. User Experience
- Intuitive and user-friendly interface.

### 4. Database Design
- Efficient and normalized database design.

### 5. Security
- Proper implementation of authentication and data validation to prevent security vulnerabilities.

### 6. Deployment
- Proper deployment of the application with clear instructions.

## Installation

### Backend Setup
1. Clone the repository.
2. Navigate to the `backend` folder.
3. Install dependencies:
    ```
    npm install
    ```
4. Create a `.env` file and add your MongoDB URI and JWT secret key:
    ```
    MONGO_URI=your_mongo_database_uri
    JWT_SECRET=your_jwt_secret_key
    ```
5. Start the backend server:
    ```
    npm start
    ```

### Frontend Setup
1. Navigate to the `frontend` folder.
2. Install dependencies:
    ```
    npm install
    ```
3. Start the frontend server:
    ```
    npm start
    ```

Visit `http://localhost:3000` to access the application.
