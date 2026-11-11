# Aplikasi KKPUS - Flow Penggunaan

## Overview

**Portal Anggota Koperasi KKPUS (kkpusid)** - PWA web berbasis React 18, Vite, Bootstrap 5 yang terhubung dengan backend REST API **KKPUS (api.kkpus.id)**.

## Architecture Flow

```
┌─────────────────┐     ┌──────────────────┐
│   kkpusid (FWD) │────▶│   api.kkpus.id   │
│  (Frontend PWA) │     │  (Backend API)   │
└─────────────────┘     └──────────────────┘
```

## Flow Steps

### 1. Application Startup

**Frontend (kkpusid)**
- `npm run dev` starts Vite development server on port 3000
- Builds to `build/` directory for production
- Uses environment variables from `.env` files (`.env.development`, `.env.production`)
- Loads configuration from `vite.config.js`

**Backend (api.kkpus.id)**
- `npm start` starts Express server on port 3000 (HTTP) or 3445 (HTTPS)
- Uses `app.js` as entry point
- Configured via `vitest.config.js` for testing
- SSL support via `api.kkpus.id` (production) or `localhost:5000` (development)

### 2. Authentication Flow

**Frontend** - User authentication:
1. User visits `https://kkpus.id` or `https://localhost:5000`
2. Clicks "Register" → `POST /api/auth/register`
3. Backend validates input and creates user account
4. Returns JWT token and session cookie
5. Frontend stores token in localStorage/cookies

**Backend** - Auth endpoints (`app.js`):
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - Login, returns JWT
- `GET /api/auth/me` - Get current user profile
- `POST /api/auth/accountLogin` - Login with email/password
- `POST /api/auth/logout` - Clear session

### 3. Data Flow - Member Profile

**Frontend** (`src/routes/pages/angotaRoutes.jsx`):
- `GET /api/anggota/profile` - Fetch member profile (KYC status, etc.)
- `POST /api/anggota/profile` - Update profile

**Backend** (`src/routes/pages/angotaRoutes.jsx`):
- Contains endpoints for member profile management
- Uses `profileService.js` in `src/services/`

### 4. Savings & Deposit Flow

**Frontend** - Savings page (`src/routes/pages/savingsRoutes.jsx`):
- `GET /api/savings/request-withdrawal` - Withdrawal request
- `POST /api/savings/disburse/{withdrawal_id}` - Execute withdrawal

**Backend** (`src/routes/pages/savingsRoutes.jsx`):
- Handles withdrawal requests
- Validates amount, category, method
- Updates savings status

### 5. Investment & Financing Flow

**Frontend** - Investment page (`src/routes/pages/investasiRoutes.jsx`):
- `GET /api/investasi` - Investment portfolio
- `POST /api/investasi` - Create new investment

**Backend** (`src/routes/pages/investasiRoutes.jsx`):
- Manages sukuk/investment portfolios
- Uses `investasiService.js`

### 6. Checkout & POS Flow

**Frontend** - Checkout page (`src/routes/pages/jualbeliRoutes.jsx`):
- `POST /api/jualbeli/checkout` - Process POS transaction
- `GET /api/jualbeli` - View transaction history

**Backend** (`src/routes/pages/jualbeliRoutes.jsx`):
- Handles POS checkout transactions
- Integrates with Midtrans for payments

### 7. Dashboard & Reporting

**Frontend** - Dashboard (`src/routes/pages/dashboardRoutes.jsx`):
- `GET /api/dashboard/stats` - Financial statistics
- `GET /api/auth/me` - Current user data

**Backend** (`src/routes/pages/dashboardRoutes.jsx`):
- Aggregates metrics from `dashboardController.js`
- Provides executive KPI reports

## Key API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|-------|
| `/api/auth/register` | POST | User registration | No |
| `/api/auth/login` | POST | User login | No |
| `/api/auth/me` | GET | Get current user | BearerAuth |
| `/api/auth/accountLogin` | POST | Login with email/password | No |
| `/api/anggota/profile` | GET | Member profile | BearerAuth |
| `/api/savings/request-withdrawal` | POST | Withdrawal request | BearerAuth |
| `/api/savings/disburse/{withdrawal_id}` | POST | Execute withdrawal | BearerAuth |
| `/api/financing/apply` | POST | Financing application | BearerAuth |
| `/api/jualbeli/checkout` | POST | POS checkout | BearerAuth |
| `/api/dashboard/stats` | GET | Dashboard stats | BearerAuth |

## Environment Variables

### kkpusid (.env files)
- `VITE_` - Vite environment variables
- `REACT_APP_` - React app variables
- `HTTPS` - Enable HTTPS
- `SSL_KEY_FILE` - Path to SSL private key
- `SSL_CRT_FILE` - Path to SSL certificate
- `PORT` - Server port

### api.kkpus.id (.env files)
- `NODE_ENV` - Environment (development/production)
- `SSL_KEY_PATH` - Path to SSL private key
- `SSL_CERT_PATH` - Path to SSL certificate
- `SSL_CA_PATH` - Path to CA certificate
- `PORT` - HTTP port (default 3000)
- `HTTPS_PORT` - HTTPS port (default 3445)

## Security Flow

1. **JWT Authentication** - All protected endpoints require Bearer token
2. **CORS Configuration** - Only allowed origins (kkpus.id, admin.kkpus.id, localhost:3000, etc.)
3. **Helmet Middleware** - Security headers (HSTS, CSP, X-Frame-Options, etc.)
4. **Cookie Parser** - Secure session management
5. **Rate Limiting** - Via `express-rate-limit` in api.kkpus.id

## Development Workflow

```bash
# Frontend
cd kkpusid
npm install
npm run dev      # Development server
npm run build    # Production build
npm run test     # Run tests

# Backend
cd api.kkpus.id
npm install
npm start        # Start Express server
npm run test:ci  # CI tests
```

## Deployment Flow

1. **Frontend** - Build to `build/` directory
2. **Backend** - Deploy `api.kkpus.id` to production server
3. **Environment** - Set `NODE_ENV=production` and provide SSL certificates
4. **HTTPS** - Enable HTTPS with proper certificates
5. **CORS** - Configure allowed origins
6. **Monitoring** - Enable memory monitoring and health checks

## Summary

- **kkpusid** (Frontend): React 18 PWA that serves member portal UI
- **api.kkpus.id** (Backend): Express REST API handling all business logic
- **Integration**: Frontend calls backend via REST API endpoints
- **Authentication**: JWT-based authentication with Bearer tokens
- **Security**: CORS, Helmet, SSL, rate limiting, and audit logging
