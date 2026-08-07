# Shortify - URL Shortener

## Overview
Shortify is a full-stack URL shortener application designed to convert long destination URLs into compact, shareable links. It provides users with features to customize aliases, configure link expiration dates, generate QR codes, and view click analytics in real-time. The application is built using React on the frontend and Node.js/Express with MySQL and Redis on the backend.

## Features
- **URL Shortening**: Generate random 7-character short codes for any destination link.
- **Custom Aliases**: Select custom text aliases for personalized URLs.
- **Link Expiration**: Configure specific expiration dates to limit link lifespan.
- **QR Code Generator**: Generate and download QR codes representing short links.
- **Real-Time Analytics**: Track total clicks and monitor click history logs.
- **Caching**: Leverages Redis for high-speed redirects, reducing database read load.
- **User Authentication**: Secure signup and login flow using JSON Web Tokens (JWT).

## Tech Stack
- **Frontend**: React, React Router v6, Vanilla CSS, Lucide React Icons
- **Backend**: Node.js, Express, MySQL (mysql2 pool connections)
- **Cache**: Redis
- **Authentication**: JWT (JSON Web Tokens), Bcrypt (password hashing)

## Project Structure
```text
URL-Shortener/
├── backend/
│   ├── src/
│   │   ├── config/          # Client initializations (Redis)
│   │   ├── controllers/     # Route controller actions
│   │   ├── database/        # MySQL pool connection
│   │   ├── middleware/      # Error and Auth handlers
│   │   ├── repository/      # MySQL prepared SQL operations
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Core business operations
│   │   └── validators/      # Payload validators
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/      # Layout shells and UI buttons/inputs
    │   ├── hooks/           # Custom React hooks (forms, state)
    │   ├── modules/         # Feature modules (auth, dashboard, qr, profile)
    │   ├── routes/          # Router tables and ProtectedRoute
    │   └── utils/           # Helper functions (storage, clipboard)
    └── .env.example
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server (configured with a schema database)
- Redis Server (running locally or in a cloud instance)

### Backend Setup
1. Navigate to the `backend` directory.
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Update the `.env` file with your local MySQL credentials, Redis connection host/port, and JWT secret parameters.

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Adjust the base API endpoint if your backend server port differs from the default `3000`.

### Environment Variables

#### Backend (`backend/.env`)
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=url_shortener
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key_at_least_32_characters
JWT_EXPIRES_IN=1d
REDIS_HOST=localhost
REDIS_PORT=6379
CORS_ORIGIN=http://localhost:5173
```

#### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_SHORTENED_BASE_URL=http://localhost:3000
```

### Running the Project
To run both backend and frontend servers locally:

1. Start the MySQL and Redis services on your system.
2. In the `backend` folder, run:
   ```bash
   npm run dev
   ```
3. In the `frontend` folder, run:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

## Screenshots
- **Landing Page**: 
![Landing Page](./src/assets/images/image.png)

- **User Dashboard**: 
![Dashboard](./src/assets/images/dashboard.png)
- **Analytics Overview**: 
![Analytics](./src/assets/images/analytics.png)

## Future Improvements
- **Click Geo-Location**: Monitor country and browser metadata for click events.
- **Bulk URL Import**: Allow shortening multiple links simultaneously from CSV uploads.
- **Custom Domain Mapping**: Let users connect their own custom domains for short URLs.

LIVE DEMO: url-shortner-production-dd38.up.railway.app

## Author
Abhiraj Kumar
