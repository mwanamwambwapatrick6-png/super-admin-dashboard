# Super Admin Dashboard - Frontend

## Overview

React 18 + Vite application for the Super Admin Dashboard. Provides a modern, responsive UI for managing users, roles, departments, and permissions.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Routing**: React Router v6

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

Access at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/              # API client functions
├── components/       # Reusable components
├── layouts/          # Layout components
├── pages/            # Page components
├── store/            # Redux store and slices
├── App.tsx           # Main app component
├── main.tsx          # Entry point
└── index.css         # Global styles
```

## Features

- ✅ JWT Authentication
- ✅ User Management
- ✅ Role Management
- ✅ Department Management
- ✅ Permission Management
- ✅ Responsive Design
- ✅ Dark Mode Support
- ✅ Redux State Management
