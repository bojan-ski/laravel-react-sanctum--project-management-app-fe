# 📋 Project management application PMA

The **PMA** app is a modern project management application designed to help teams collaborate, track tasks, and communicate in real-time.  
It provides an intuitive interface for managing projects, assigning tasks, uploading documents, and chatting with team members — all wrapped in a clean and responsive design.

---

## ✨ Features

### 👤 Regular User
- 🔐 Authentication: Sign up, Sign in, Reset password
- 👤 Profile management with avatar upload
- 📁 **Projects**
  - Create, edit, delete own projects
  - View project details with task overview
  - Invite members via email
  - Manage project members (remove members)
- ✅ **Tasks**
  - Create tasks with title, description, priority, due date
  - Assign tasks to project members
  - Update task status (To Do → In Progress → Review → Done)
  - Update task priority (Low, Medium, High, Urgent)
  - Upload documents to tasks
  - View full activity timeline
- 💬 **Real-time Chat**
  - Private 1-on-1 messaging per task
  - WebSocket-powered instant messages
  - Message delete functionality
  - Unread message indicators
- 🔔 **Notifications**
  - Project invitation notifications
  - Task assignment notifications
  - New message notifications
  - Mark as read / delete notifications

---

### 🛡️ Admin User
- 📊 **Dashboard** with system statistics
- 👥 **User Management**
  - View all users with search & pagination
  - Create new users (credentials sent via email)
  - View user details with project history
  - Delete users
- 📂 **Project Management**
  - View all projects with search & filters
  - View project details
  - Change project status
  - Delete projects

---

## 🛠️ Technology Stack

- **Framework**: [React 19+](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router 6+](https://reactrouter.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Real-Time**: [Pusher](https://pusher.com/) with [Laravel Echo](https://laravel.com/docs/broadcasting#client-side-installation)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🔗 Related Repository

- **Backend API**: [laravel-pma-api](https://github.com/bojan-ski/laravel-react-sanctum--project-management-app-be)

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/bojan-ski/laravel-react-sanctum--project-management-app-fe
cd react-pma
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Backend
Ensure the [PMA API](https://github.com/bojan-ski/laravel-pma-api) is running.

### 4. Create Pusher Account
[Pusher](https://pusher.com/) – For real-time WebSocket communication

### 5. Environment Setup - .env
```env
# API URL
VITE_API_URL=http://localhost:8000

# Pusher
VITE_PUSHER_APP_KEY=
VITE_PUSHER_APP_CLUSTER=
```

### 6. Run the Development Server
```bash
npm run dev
```

---

## 👨‍💻 Author

Developed with ❤️ by BPdevelopment (bojan-ski)