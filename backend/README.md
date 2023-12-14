# Simple CRUD Application using Express.js

This is a simple Express.js application that demonstrates CRUD (Create, Read, Update, Delete) operations using local variables as storage.

## Prerequisites

- Node.js installed on your machine

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/yastamardika/kitameraki_recruitment_yastamardika
    ```

2. Navigate to the project directory:

    ```bash
    cd kitameraki_recruitment_yastamardika/backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the server:

    ```bash
    node app.js
    ```

   The server will start running on http://localhost:8000 by default.

## API Endpoints

- **GET /api/tasks:** Fetch all tasks.
- **POST /api/tasks:** Create a new task.
- **PUT /api/tasks/:id:** Update a task by ID.
- **DELETE /api/tasks/:id:** Delete a task by ID.

## Usage

You can use tools like cURL, Postman, or any HTTP client to interact with the API endpoints.

### Examples:

1. **Fetch all tasks with pagination:**

    ```bash
    curl http://localhost:8000/tasks?page=1&perpage=10
    ```
2. **Create a task:**

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"title":"New Task", "description":"Description of the new task"}' http://localhost:8000/tasks
    ```

3. **Update a task:**

    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{"title":"Updated Task", "description":"Updated description"}' http://localhost:8000/tasks/1
    ```

4. **Delete a task:**

    ```bash
    curl -X DELETE http://localhost:8000/tasks/1
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
