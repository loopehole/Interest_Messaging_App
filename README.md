# Full-Stack Interest Application

## Project Overview
This project is a full-stack application that allows users to register, log in, send interests to other users, accept/reject interests, and change their passwords. The backend is built with Django, while the frontend is built with React.

## Setup Instructions

### Prerequisites
- Python 3.x
- Node.js
- npm (Node Package Manager)
- PostgreSQL (or any other database you are using)

### Backend Setup (Django)

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name/backend
    ```

2. **Create and activate a virtual environment:**
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. **Install dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

4. **Configure environment variables:**
    Create a `.env` file in the `backend` directory and add your database configuration and secret key:
    ```env
    SECRET_KEY=your_secret_key
    DATABASE_NAME=your_db_name
    DATABASE_USER=your_db_user
    DATABASE_PASSWORD=your_db_password
    DATABASE_HOST=your_db_host
    DATABASE_PORT=your_db_port
    ```

5. **Apply database migrations:**
    ```sh
    python manage.py migrate
    ```

6. **Create a superuser:**
    ```sh
    python manage.py createsuperuser
    ```

7. **Run the server:**
    ```sh
    python manage.py runserver
    ```

### Frontend Setup (React)

1. **Navigate to the frontend directory:**
    ```sh
    cd ../frontend
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the development server:**
    ```sh
    npm start
    ```

## Configuration
Make sure the Django backend is running on a different port (usually 8000) and the React frontend on another (usually 3000). You may need to configure CORS settings in your Django backend to allow requests from the React frontend.

## Running the Application
- Start the Django server:
    ```sh
    python manage.py runserver
    ```
- Start the React development server:
    ```sh
    npm start
    ```

## API Endpoints
- **User Registration:** `POST /api/register/`
- **User Login:** `POST /api/login/`
- **Change Password:** `POST /api/change-password/`
- **Get Users:** `GET /api/accounts/users/`
- **Send Interest:** `POST /api/accounts/interests/`
- **List Interests:** `GET /api/accounts/interests/`

## Testing
### Backend (Django)
1. **Run unit tests:**
    ```sh
    python manage.py test
    ```

### Frontend (React)
1. **Run tests:**
    ```sh
    npm test
    ```

## Design Choices and Assumptions
- **Backend:** Chose Django for its robust framework and ease of handling user authentication.
- **Frontend:** Chose React for its component-based architecture and ease of managing state.
- **API Structure:** Followed RESTful principles for API design.
- **State Management:** Used React hooks for state management.

## Incomplete Aspects and Future Improvements
- Implement user profile management.
- Enhance the chat system with real-time capabilities using WebSockets.
- Improve UI/UX for better user experience.
- Add comprehensive unit and integration tests.

## Potential Next Steps
- Deploy the application to a cloud service (e.g., Heroku, AWS).
- Implement user notifications for interest actions.
- Integrate a third-party authentication system (e.g., Google OAuth).

---
### Key Components

#### Backend
- **Models:** Defined in `FULLSTACK_PROJECT/messaging/models.py` and `FULLSTACK_PROJECT/account/models.py`.
- **Views:** Defined in `FULLSTACK_PROJECT/messaging/views.py` and `FULLSTACK_PROJECT/account/views.py`.
- **URLs:** Defined in `FULLSTACK_PROJECT/messaging/urls.py` and `FULLSTACK_PROJECT/account/urls.py`.

#### Frontend
- **Components:** Located in `interest-frontend/src/components/`, including `ChangePassword.js`, `Dashboard.js`, `Login.js`, `MessageForm.js`, `MessageList.js`, `PrivateRoute.js`, `RecievedInterests.js`, `Register.js`, `SendInterest.js`, and `UserLists.js`.
- **App.js:** Main entry point for routing and component rendering.
- **index.js:** Entry point for rendering the React application.
