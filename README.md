# IGL

IGL is an anonymous messaging platform built using Next.js and Go. It allows users to send messages to others without revealing their identity. The application provides a secure and user-friendly interface for sending and receiving anonymous messages.

## Features

- **Anonymous Messaging**: Send messages to users without revealing your identity.
- **User Accounts**: Create and manage user accounts.
- **Real-Time Communication**: Instant delivery of messages.

## Technologies Used

- **Frontend**: Next.js
- **Backend**: Go (Golang)
- **Database**: MongoDB
- **Authentication**: Custom authentication implemented in Go

## Getting Started

Follow these steps to get a local copy of the project up and running:

### Prerequisites

- [Node.js](https://nodejs.org/) (for running the frontend)
- [Go](https://golang.org/) (for running the backend)
- [MongoDB](https://www.mongodb.com/) (for the database)

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/igl.git
    cd igl
    ```

2. **Set Up Frontend**

    Navigate to the frontend directory and install dependencies:

    ```bash
    cd frontend
    npm install
    ```

3. **Set Up Backend**

    Navigate to the backend directory and install dependencies:

    ```bash
    cd backend
    go mod tidy
    ```

4. **Set Up Environment Variables**

    Create a `.env` file in both the frontend and backend directories with the necessary environment variables. 

    Example `.env` for the backend:

    ```env
    PORT=8080
    DATABASE_URL=mongodb://localhost:27017/yourdbname
    JWT_SECRET=your_jwt_secret_key
    ```

    Example `.env` for the frontend:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8080
    ```

5. **Run the Application**

    Start the backend server:

    ```bash
    cd backend
    go run main.go
    ```

    Start the frontend application:

    ```bash
    cd ../frontend
    npm run dev
    ```

    The frontend will be available at [http://localhost:3000](http://localhost:3000), and the backend at [http://localhost:8080](http://localhost:8080).

## Usage

### Messaging

- **Send a Message**: Navigate to the messaging page, enter the recipient's information, and send your anonymous message.
- **View Messages**: Check received messages in your inbox.

### User Management

- **Sign Up**: Create a new user account on the registration page.
- **Log In**: Authenticate using the login page.

### Authentication

- **Custom Authentication**: The backend uses custom authentication mechanisms built in Go. Ensure your JWT secret and MongoDB URI are properly set in the environment variables.

## API Endpoints

### User Authentication

- **POST** `/auth/register`: Register a new user
- **POST** `/auth/login`: Log in an existing user

### Messaging

- **POST** `/messages/send`: Send an anonymous message
- **GET** `/messages/get/{username}`: Retrieve received messages

## Contributing

Contributions are welcome! Please submit issues and pull requests. Make sure to follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Go**: [Go Documentation](https://golang.org/doc/)
- **MongoDB**: [MongoDB Documentation](https://docs.mongodb.com/)
