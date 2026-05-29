# Super Admin Dashboard

A complete, production-ready full-stack super admin dashboard with role-based access control, user management, and modern UI.

## 🎯 Features

- ✅ Complete Authentication System (JWT)
- ✅ Role-Based Access Control (RBAC)
- ✅ User Management
- ✅ Department Management
- ✅ Permission Management
- ✅ Audit Logs
- ✅ Responsive Dashboard
- ✅ Dark Mode Support
- ✅ Docker & Docker Compose Ready
- ✅ Production-Ready Code

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT
- **API**: RESTful

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📋 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Backend setup
cd backend
npm install
cp .env.example .env
npm run dev

# In another terminal - Frontend setup
cd frontend
npm install
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/health

### Demo Credentials

```
Email: admin@example.com
Password: Admin@123456
```

## 🐳 Docker Setup

```bash
# Start with Docker Compose
docker-compose up -d

# Access via
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

## 📁 Project Structure

```
super-admin-dashboard/
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Authentication, validation
│   │   └── utils/          # Helper functions
│   ├── .env.example
│   └── package.json
│
├── frontend/                # React Vite App
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   └── api/            # API calls
│   ├── .env.example
│   └── package.json
│
└── docker-compose.yml
```

## 🔐 Demo Credentials

- **Email**: `admin@example.com`
- **Password**: `Admin@123456`

## 🚀 Next Steps

1. Clone the repository
2. Follow the Quick Start guide
3. Customize the code as needed
4. Deploy using Docker or your preferred hosting

## 📚 Documentation

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📄 License

MIT License

---

**Happy Coding! 🎉**