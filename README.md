# TaskFlow | Personal Task Manager

TaskFlow is a premium, responsive, and modern Personal Task Manager web application built with **React**, **Vite**, **Tailwind CSS v3**, **Axios**, **Node.js**, **Express**, and **JSON file persistence**. It features a warm, approachable, and tactile paper-sheet aesthetic.

# Features
# Core Features
Create new tasks
View all tasks
Edit existing tasks
Delete tasks with confirmation
Mark tasks as completed or active
Filter tasks by status (All, Active, Completed)
Sort tasks by creation date
# Additional Features
Search tasks by title
Task statistics dashboard
Empty state UI
Responsive design
Persistent storage using JSON file
REST API architecture

## Directory Architecture

```text
task_manager/
├── backend/
│   ├── controllers/
│   │   └── taskController.js      # CRUD operations logic
│   ├── data/
│   │   └── tasks.json            # Tasks JSON database file
│   ├── middleware/
│   │   ├── errorHandler.js       # Centralized error handler middleware
│   │   └── validator.js          # Request validator middleware
│   ├── routes/
│   │   └── taskRoutes.js         # API endpoint routing
│   ├── package.json              # Express server dependencies
│   └── server.js                 # API entry point & fallback routing
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
│   │   │   └── Dashboard.jsx     # App page assembler
│   │   ├── services/
│   │   │   └── api.js            # Axios client configuration with environment support
│   │   ├── App.jsx               # React App core component
│   │   ├── index.css             # Tailwind imports & tactile utility classes
│   │   └── main.jsx              # React DOM mounting file
│   ├── index.html                # Entry HTML template
│   ├── postcss.config.js         # PostCSS config
│   ├── tailwind.config.js        # Tailwind v3 config & custom colors
│   ├── vite.config.js            # Vite configurations (dev server proxy)
│   └── package.json              # Client dependencies

## Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Run the Application

### Start Backend Server

```bash
cd backend
npm start
```

Backend will run on:

```text
http://localhost:5000
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```


LIVE LINK: https://task-manager-t8sg.vercel.app/
