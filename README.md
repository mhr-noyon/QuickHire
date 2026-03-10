# QuickHire

A full-stack job board application where users can **browse**, **search**, **filter**, and **apply to jobs** — while admins manage listings through a protected dashboard.

Built with **Next.js 16** + **TypeScript** on the frontend and **Express 5** + **MySQL** on the backend.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Express](https://img.shields.io/badge/Express-5-000?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

---

---

## Getting Started

### Prerequisites

- **Node.js**
- **MySQL** database (local or hosted)

### 1. Clone

```bash
git clone https://github.com/mhr-noyon/QuickHire.git
cd QuickHire
```

### 2. Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and fill in your values:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=quickhire

ADMIN_USERNAME=admin
ADMIN_PASSWORD=password

ALLOWED_ORIGINS=http://localhost:3000
```

Start the server:

```bash
npm run dev
```

> The server runs at **http://localhost:5000**. On first start, it automatically creates the `jobs` and `applications` tables and seeds 19 sample jobs + 61 sample applications.

### 3. Frontend

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

> Open **http://localhost:3000** in your browser.

---

## What It Does

**For Job Seekers:**

- Browse all available jobs on a clean listings page
- Search by keyword and location with instant results
- Filter by category (Design, Technology, Marketing, etc.) and location
- View full job details with company info and description
- Apply directly with name, email, resume link, and cover note

**For Admins:**

- Secure login with token-based authentication
- Dashboard with stats overview (total jobs, categories, locations, applications)
- Create new job listings with category selection
- Search, view, and delete existing jobs
- Browse all submitted applications with applicant details
- Confirmation dialogs before destructive actions

---

## Tech Stack

| Layer    | Tech                                           |
| -------- | ---------------------------------------------- |
| Frontend | Next.js 16.1.6, React 19.2.3, TypeScript 5     |
| Styling  | Tailwind CSS v4                                |
| Icons    | Lucide React 0.577.0                           |
| Backend  | Node.js, Express 5.2.1                         |
| Database | MySQL (mysql2 3.19.1)                          |
| Auth     | HMAC-SHA256 token, stored in localStorage      |
| Fonts    | ClashDisplay (local), Epilogue, Geist (Google) |

---

## Project Structure

```
QuickHire/
│
├── backend/
│   ├── index.js                     # Server entry — Express, CORS, routes
│   ├── .env.example                 # Environment template
│   ├── controllers/
│   │   ├── jobController.js         # Job CRUD operations
│   │   └── applicationController.js # Application queries
│   ├── dbConfig/
│   │   ├── db.js                    # MySQL connection pool
│   │   └── setupDB.js              # Auto table creation + seed data
│   ├── middleware/
│   │   ├── auth.js                  # Token generation & admin guard
│   │   └── validate.js             # Input validation (email, URL, required fields)
│   ├── routes/
│   │   ├── authRoutes.js           # POST /login, GET /check
│   │   ├── jobRoutes.js            # GET, POST, DELETE /jobs
│   │   └── applicationRoutes.js    # GET (admin), POST /applications
│   └── utils/
│       └── response.js             # Standardized JSON response helpers
│
├── frontend/
│   ├── .env.example                 # Frontend environment template
│   └── src/
│       ├── app/
│       │   ├── layout.tsx          # Root layout — fonts, header, footer
│       │   ├── page.tsx            # Home / landing page
│       │   ├── globals.css         # Theme tokens, Tailwind config
│       │   ├── login/page.tsx      # Admin login
│       │   ├── admin/page.tsx      # Admin dashboard
│       │   └── jobs/
│       │       ├── page.tsx        # Job listings
│       │       └── [id]/page.tsx   # Job detail + apply form
│       ├── components/
│       │   ├── layout/             # Header, Footer, Container
│       │   ├── home/               # HeroSection, FeaturedJobs, Categories, Companies, PostJobs
│       │   ├── jobs/               # JobCard, JobListings, JobDetail, SearchBar, FilterSidebar, ApplicationForm
│       │   └── admin/              # AdminPanel, JobList, ApplicationList, Modals (Job, Application, Confirm)
│       └── lib/
│           ├── api.ts              # Centralized API client with auth helpers
│           ├── types.ts            # TypeScript interfaces (Job, Application, ApplicationWithJob)
│           ├── CategoryList.tsx    # Shared category constants
│           └── CategoryStyle.tsx   # Category color mapping
│
└── README.md
```

## API Reference

All responses use a consistent JSON envelope:

```json
{ "success": true, "data": { ... } }
{ "success": false, "message": "...", "errors": ["..."] }
```

### Auth

| Method | Endpoint          | Auth | Description                             |
| ------ | ----------------- | ---- | --------------------------------------- |
| POST   | `/api/auth/login` | —    | Login with username/password, get token |
| GET    | `/api/auth/check` | Yes  | Verify if current token is valid        |

### Jobs

| Method | Endpoint                    | Auth  | Description                             |
| ------ | --------------------------- | ----- | --------------------------------------- |
| GET    | `/api/jobs`                 | —     | List all jobs (newest first)            |
| GET    | `/api/jobs/featured`        | —     | Get top featured jobs (limit via query) |
| GET    | `/api/jobs/:id`             | —     | Get single job by ID                    |
| GET    | `/api/jobs/count/:category` | —     | Get job count for a category            |
| POST   | `/api/jobs`                 | Admin | Create a new job listing                |
| DELETE | `/api/jobs/:id`             | Admin | Delete a job (cascades to applications) |

### Applications

| Method | Endpoint            | Auth  | Description                              |
| ------ | ------------------- | ----- | ---------------------------------------- |
| GET    | `/api/applications` | Admin | List all applications (with job details) |
| POST   | `/api/applications` | —     | Submit a job application                 |

**Admin-protected routes** require a `Bearer <token>` header obtained from `/api/auth/login`.

---

## Database Schema

Tables are auto-created on server startup. No manual migrations needed.

### `jobs`

| Column      | Type         | Constraints                       |
| ----------- | ------------ | --------------------------------- |
| id          | INT          | PRIMARY KEY, AUTO_INCREMENT       |
| title       | VARCHAR(255) | NOT NULL                          |
| company     | VARCHAR(255) | NOT NULL                          |
| logo        | TEXT         | Nullable — company logo URL       |
| location    | VARCHAR(100) | NOT NULL                          |
| category    | TEXT         | NOT NULL — comma-separated values |
| description | TEXT         | NOT NULL                          |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP         |

### `applications`

| Column      | Type         | Constraints                                        |
| ----------- | ------------ | -------------------------------------------------- |
| id          | INT          | PRIMARY KEY, AUTO_INCREMENT                        |
| job_id      | INT          | NOT NULL, FOREIGN KEY → jobs(id) ON DELETE CASCADE |
| name        | VARCHAR(255) | NOT NULL                                           |
| email       | VARCHAR(255) | NOT NULL                                           |
| resume_link | TEXT         | NOT NULL                                           |
| cover_note  | TEXT         | Nullable                                           |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                          |

---

## Key Highlights

- **Auto-setup** — tables and seed data are created on first server start, zero manual SQL needed
- **Skeleton loading** — animated placeholder cards while jobs are fetching
- **Debounced search** — 250ms delay on keyword and location inputs for smooth UX
- **Category count badges** — each filter shows how many jobs match
- **Sticky apply form** — application form stays visible while scrolling job details
- **Delete cascade** — deleting a job automatically removes all its applications
- **Responsive everywhere** — mobile-first design with proper breakpoints for tablet and desktop
- **Consistent API envelope** — every endpoint returns `{ success, data }` or `{ success, message, errors }`
- **CORS configuration** — allowed origins controlled via environment variable

---

## Design

UI follows the provided Figma template with matching layout, typography, colors, and spacing.

**Color palette:** `#4640DE` (primary), `#25324B` (text), `#515B6F` (secondary), `#7C8493` (muted), `#F8F8FD` (background)

**Fonts:** ClashDisplay for headings, Geist Sans for body, Epilogue for accents
