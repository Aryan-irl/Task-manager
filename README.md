# TaskFlow | Personal Task Manager

TaskFlow is a premium, responsive, and modern Personal Task Manager web application built with **React**, **Vite**, **Tailwind CSS v3**, **Axios**, **Node.js**, **Express**, and **JSON file persistence**.

## Features
- **Create Tasks**: Add new tasks with a required Title, optional Description, and optional Due Date.
- **Dynamic Statistics Dashboard**: Real-time counters showing Total Tasks, Active Tasks, and Completed Tasks.
- **Instant Search**: Throttled title-based text matching in the frontend.
- **Status Filter**: Categorize and view tasks by *All*, *Active*, or *Completed*.
- **Overdue Highlighting**: Tasks whose due date has passed are visually highlighted with amber/red text and warning badges.
- **Inline Completion Toggles**: Single-click toggles that optimistically update the client-side state and synchronize with the backend.
- **Task Modifying**: Modal-based forms for updating existing task details.
- **Safe Task Removal**: Double-confirmation dialog modal to prevent accidental deletions.
- **REST API Architecture**: Structured Node.js/Express backend following standard API design guidelines.
- **JSON File Store Persistence**: Tasks data persists inside `backend/data/tasks.json` across server restarts.
- **Fully Responsive**: Optimized UI designs using Tailwind CSS custom tokens for flawless mobile and desktop viewports.

---

## Directory Architecture

```text
task_manager/
├── backend/
│   ├── controllers/
│   │   └── taskController.js      # CRUD core logic & JSON reading/writing
│   ├── data/
│   │   └── tasks.json            # Tasks persistence store
│   ├── middleware/
│   │   ├── errorHandler.js       # Global Express error filter
│   │   └── validator.js          # Express request body validator
│   ├── routes/
│   │   └── taskRoutes.js         # REST endpoints routing definitions
│   ├── package.json              # Backend dependencies (express, cors, uuid)
│   └── server.js                 # Backend Server Entry Point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmationModal.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── TaskFilters.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskStats.jsx
│   │   ├── hooks/
│   │   │   └── useTasks.js       # State logic custom React hook
│   │   ├── pages/
│   │   │   └── Dashboard.jsx     # Dashboard layout assembler
│   │   ├── services/
│   │   │   └── api.js            # Custom Axios instance with interceptors
│   │   ├── App.jsx               # React App Entry Point
│   │   ├── index.css             # Tailwind v3 imports and custom utility classes
│   │   └── main.jsx              # DOM Mount Bootstrapper
│   ├── index.html                # Entry HTML Template
│   ├── postcss.config.js         # PostCSS config
│   ├── tailwind.config.js        # Tailwind theme custom configuration
│   ├── vite.config.js            # Vite configuration with Backend API proxy
│   └── package.json              # Frontend dependencies
│
└── README.md                     # Master Project Documentation (This file)
```

---

## API Documentation

All API requests are sent to `/api/tasks` (served at `http://localhost:5000/api/tasks` in development).

### Task Schema (JSON Object)
```json
{
  "id": "e0b8ff4e-f24e-4b68-84cf-2b0b7e28b812",
  "title": "Learn React and Tailwind",
  "description": "Study state management and CSS styling practices.",
  "dueDate": "2026-06-30",
  "completed": false,
  "createdAt": "2026-06-04T11:00:00.000Z",
  "updatedAt": "2026-06-04T11:00:00.000Z"
}
```

### Endpoints

#### 1. Retrieve Tasks
* **URL**: `/api/tasks`
* **Method**: `GET`
* **Query Parameters (Optional)**:
  * `search` (string): Text match on title.
  * `status` (string): Filter by `active` or `completed`.
* **Success Response (200 OK)**:
  Returns a list of tasks sorted by `createdAt` descending.
  ```json
  [
    {
      "id": "e0b8ff4e-f24e-4b68-84cf-2b0b7e28b812",
      "title": "Important Task",
      "description": "An important assignment due soon",
      "dueDate": "2026-06-05",
      "completed": false,
      "createdAt": "2026-06-04T11:00:00.000Z",
      "updatedAt": "2026-06-04T11:00:00.000Z"
    }
  ]
  ```

#### 2. Get Task by ID
* **URL**: `/api/tasks/:id`
* **Method**: `GET`
* **Success Response (200 OK)**: Single task object.
* **Error Response (404 Not Found)**: Task does not exist.

#### 3. Create Task
* **URL**: `/api/tasks`
* **Method**: `POST`
* **Request Body**:
  ```json
  {
    "title": "Study Deep Learning",
    "description": "Complete chapter 3 on neural networks.",
    "dueDate": "2026-06-15"
  }
  ```
* **Success Response (201 Created)**: Returns the newly created task with its unique UUID, completed status, and creation timestamps.
* **Error Response (400 Bad Request)**: Title is missing or empty.

#### 4. Update Task (Edits & Completion)
* **URL**: `/api/tasks/:id`
* **Method**: `PUT`
* **Request Body** (Send only fields needing updates):
  ```json
  {
    "completed": true
  }
  ```
* **Success Response (200 OK)**: Returns the updated task object.
* **Error Response (404 Not Found)**: Task does not exist.

#### 5. Delete Task
* **URL**: `/api/tasks/:id`
* **Method**: `DELETE`
* **Success Response (200 OK)**:
  ```json
  {
    "message": "Task with ID e0b8ff4e-f24e-4b68-84cf-2b0b7e28b812 deleted successfully.",
    "task": { ...deletedTaskDetails... }
  }
  ```

---

## Installation & Running Instructions

### Prerequisites
- Node.js (version 16 or newer recommended)
- npm (Node Package Manager)

### Step 1: Install Dependencies
Run installation scripts in both backend and frontend folders.

```bash
# 1. Install Backend dependencies
cd backend
npm install

# 2. Install Frontend dependencies
cd ../frontend
npm install
```

### Step 2: Running the Application in Development Mode

You will need to open two terminal windows (or run concurrently) to start both the backend server and frontend development client.

#### Start Backend API
```bash
cd backend
npm run dev
```
The backend server will run on `http://localhost:5000` and watch files for auto-reloading.

#### Start Frontend Dev Client
```bash
cd frontend
npm run dev
```
Vite will start the client, typically on `http://localhost:5173`. Any requests directed to `/api` will be automatically forwarded to the backend server running on port 5000.

Open your browser and navigate to `http://localhost:5173` to explore the Personal Task Manager!
