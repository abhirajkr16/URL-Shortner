# URL Shortener Frontend

A React application for the URL Shortener client. This interface communicates with a backend REST API to allow users to shorten long URLs, configure custom aliases, define expiration dates, download generated QR codes, track click statistics, and manage their links through a dashboard.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Installation and Running](#installation-and-running)
- [Routing](#routing)
- [License](#license)

---

## Features

- **URL Shortening**: Shorten long links with optional custom aliases and expiration dates.
- **QR Code Generator**: Create and download high-resolution PNG QR codes for shortened URLs.
- **Analytics Overview**: Track click metrics (Total Clicks, Average Clicks) and status states (Active, Expired, Deleted) for your links.
- **Dynamic Themes**: Dark and light mode toggle integrated via React Context and CSS properties.
- **Guarded Authentication**: Secure routing guards requiring JWT authentication to access the dashboard.

---

## Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component library for UI structuring and rendering |
| **React Router DOM 7** | Client-side routing and protected routes |
| **Axios** | HTTP request client for REST API communication |
| **Vite** | Modern frontend build tool and dev server |
| **Tailwind CSS 4** | CSS compiling utilities |
| **React QR Code** | Browser-rendered SVG matrix code generation |
| **HTML to Image** | Canvas rendering for PNG download operations |

---

## Folder Structure

```
src/
├── assets/
│   ├── icons/
│   ├── images/
│   └── logo/
├── components/
│   ├── layout/
│   │   ├── DashboardNavbar.jsx
│   │   ├── dashboard-navbar.css
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── PublicNavbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── sidebar.css
│   │   ├── UserDropdown.jsx
│   │   └── UserDropdown.css
│   └── ui/
│       ├── Button.jsx
│       ├── Button.css
│       ├── Card.jsx
│       ├── Card.css
│       ├── ConfirmationModal.jsx
│       ├── ConfirmationModal.css
│       ├── EmptyState.jsx
│       ├── Input.jsx
│       ├── Input.css
│       ├── Loader.jsx
│       ├── Modal.jsx
│       ├── TooltipPopup.jsx
│       └── TooltipPopup.css
├── constants/
│   ├── apiEndpoints.js
│   ├── navigation.js
│   └── routes.js
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useForm.js
│   └── useTheme.js
├── layouts/
│   ├── AuthLayout.jsx
│   ├── DashboardLayout.jsx
│   ├── PublicLayout.jsx
│   └── dashboard-layout.css
├── modules/
│   ├── analytics/
│   │   ├── AnalyticsOverviewPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── ClickChart.jsx
│   │   ├── analytics.css
│   │   └── analyticsService.js
│   ├── auth/
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── auth.css
│   ├── dashboard/
│   │   ├── CreateUrlCard.jsx
│   │   ├── DashboardCards.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── RecentUrls.jsx
│   │   ├── dashboard.css
│   │   └── dashboardService.js
│   ├── help/
│   │   ├── HelpPage.jsx
│   │   └── help.css
│   ├── landing/
│   │   ├── LandingPage.jsx
│   │   ├── Hero.jsx
│   │   └── landing.css
│   ├── privacy/
│   │   ├── PrivacyPage.jsx
│   │   └── privacy.css
│   ├── profile/
│   │   ├── ProfilePage.jsx
│   │   └── profile.css
│   ├── qr/
│   │   ├── QRForm.jsx
│   │   ├── QRModal.jsx
│   │   ├── qr-modal.css
│   │   ├── QRPage.jsx
│   │   ├── QRPreview.jsx
│   │   └── qr.css
│   └── terms/
│       ├── TermsPage.jsx
│       └── terms.css
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   └── storage.js
├── styles/
│   ├── global.css
│   ├── reset.css
│   ├── themes.css
│   └── variables.css
├── App.jsx
└── main.jsx
```

---

## Environment Variables

Create a `.env` file in the `frontend` root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

---

## Installation and Running

### 1. Clone & Navigate
```bash
git clone https://github.com/abhirajkr16/URL-Shortner.git
cd URL-Shortener/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`. Make sure the backend server is running on `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```
Optimized static files will be generated in the `dist` directory.

---

## Routing

| Route | Component | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | `LandingPage` | Public | Informational homepage overview |
| `/login` | `LoginPage` | Public | User authentication gate |
| `/register` | `RegisterPage` | Public | User registration page |
| `/dashboard` | `DashboardPage` | Protected | Main summary workspace and link shortener |
| `/dashboard/urls` | `UrlPage` | Protected | Manage, edit, and delete shortened links |
| `/dashboard/analytics` | `AnalyticsOverviewPage` | Protected | Click metrics catalog for all links |
| `/dashboard/analytics/:urlId` | `AnalyticsPage` | Protected | Detailed analytics view for a specific link |
| `/dashboard/qr-codes` | `QRPage` | Protected | Dedicated screen for generating and downloading QR codes |
| `/dashboard/profile` | `ProfilePage` | Protected | View user account information |

---

## License

This project currently does not specify a license.

---

## Author

- **Name**: [Your Name]
- **GitHub**: [github.com/yourusername](https://github.com/yourusername)
- **LinkedIn**: [linkedin.com/in/yourusername](https://linkedin.com/in/yourusername)
