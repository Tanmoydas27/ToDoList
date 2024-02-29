# ToDo List Web Application

This is a simple ToDo list web application built using Node.js, Express.js, EJS, and MongoDB. It allows users to register, log in, add tasks, update tasks, and delete tasks.

## Features

- User authentication using Passport.js
- Google OAuth2 authentication for login
- Add tasks with name
- Update task names
- Delete tasks
- Responsive design

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- MongoDB

## Getting Started

1. Clone the repository:
   git clone https://github.com/Tanmoydas27/ToDoList.git

2. Navigate to the project directory:
   cd ToDoList

3. Install dependencies:
   npm install


4. Set up environment variables:

Create a `.env` file in the root directory and add the following:

CLIENT_ID="654351480957-kjfqk4v6pdfi39aclai9rb8ddgh7ab2a.apps.googleusercontent.com"
SECRET_ID="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"


Replace `your-google-client-id` and `your-google-secret-id` with your actual Google OAuth2 client ID and secret.

5. Run the application:

npm start


The application will be running on http://localhost:3001.

## Usage

- Visit http://localhost:3001/ to access the application.
- Register or log in using your Google account.
- Add tasks by entering task names and clicking "Add".
- Update task names by clicking "Edit" next to the task.
- Delete tasks by clicking "Delete" next to the task.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.



