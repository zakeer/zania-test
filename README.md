# Document Management Frontend

Simple document management application built with React for Frontend and backend API built with Starlette and uses PostgreSQL as the database

## Prerequisites

- Docker and Docker Compose installed on your system.

## Running the Application

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/zakeer/zania-test
    ```

2. **Start the Services (both frontend and backend API)**
    ```bash
    docker-compose up -d --build
    ```
    This will build the Docker images (if not already built) and start the frontend, backend, and database containers.

## Access the Frontend
Open your browser and navigate to http://localhost:3000. You should see the document grid.
- This frontend communicates with a backend API built with Starlette to fetch and save document data.
- Changes to the document order are automatically saved to the database every 5 seconds.

 **Functionality**
- **View Documents**: The grid displays a list of documents with thumbnails.
- **Reorder Documents**: Drag and drop the cards to change their order.
- **View Image Overlay**: Click on a card to view the full-size image in an overlay.
- **Close Overlay**: Click outside the overlay or press the Esc key to close it.

**Backend API Endpoints**:
- GET `/documents`: Fetch all documents ordered by position.
- POST `/documents`: Add a new document.
- PUT `/documents/update`: Update the positions of multiple documents.

The backend API is exposed on port 8080.

The API uses SQLAlchemy for database interaction.

The API is asynchronous and uses Pydantic for data validation.

### Stopping the Application
```bash
docker-compose down
```



### [Architecture Details](./Architecture.md)
### [Questions](./Questions.md)


