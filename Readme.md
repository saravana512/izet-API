# I-ZET Payments (Realtime Chat Application)

The Realtime Chat Application Between 2 Users.

## Features

- **Express**: Web framework for Node.js.
- **Rate Limiter**: Middleware to limit repeated requests to public APIs and/or endpoints.
- **Nodemon**: Automatically restarts the server for development.
- **Winston**: Logging library for structured application logs.
- **UUID**: Generates unique request IDs for tracking.
- **Compression**: Uses Gzip compression for improved performance.
- **Helmet**: Security middleware for setting HTTP headers.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **Body-Parser**: Middleware to parse incoming request bodies.
- **Error Handling**: Standardized error responses for better debugging and consistency.
- **HPP (HTTP Parameter Pollution Prevention)**: Protects against HTTP parameter pollution attacks.
- **Request Logging**: Logs request body, params, query, and headers for debugging and auditing.
- **Prettier**: Code formatter for maintaining a consistent code style.
- **.gitignore**: Pre-configured to exclude sensitive files and directories.

## Database Configuration (PostgreSQL)

This project uses MongoDB as the database. Below are the required environment variables:

```env
# Replace <Cluster username> and <Cluster Password> with your actual credentials
MONGODB_CONNECTION_STRING = mongodb+srv://<Cluster username>:<Cluster Password>@cluster0.c9az05a.mongodb.net/?retryWrites=true&w=majority

```

## Installation

To install and run the application locally, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/saravana512/izet-API.git
    cd izet-API
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the required environment variables as mentioned in the "Database Configuration" section.

4. Start the application:
    ```sh
    npm start
    ```

## Usage

Once the application is running, you can access it at `http://localhost:9005`. Use the provided API endpoints to shorten URLs and manage them.

The application includes Swagger for API documentation. You can access the Swagger UI at the `/api-docs` endpoint to explore and test the API endpoints interactively.
