# Super Admin Dashboard - Backend

## Overview

Express.js API server for the Super Admin Dashboard application. Provides RESTful endpoints for user management, role management, department management, and permissions.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: JWT
- **Validation**: Zod
- **Password Hashing**: bcryptjs

## Setup

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Roles
- `GET /api/roles` - List all roles
- `POST /api/roles` - Create role
- `GET /api/roles/:id` - Get role by ID
- `PUT /api/roles/:id` - Update role
- `DELETE /api/roles/:id` - Delete role

### Departments
- `GET /api/departments` - List all departments
- `POST /api/departments` - Create department
- `GET /api/departments/:id` - Get department by ID
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Permissions
- `GET /api/permissions` - List all permissions
- `POST /api/permissions` - Create permission
- `GET /api/permissions/:id` - Get permission by ID
- `PUT /api/permissions/:id` - Update permission
- `DELETE /api/permissions/:id` - Delete permission
