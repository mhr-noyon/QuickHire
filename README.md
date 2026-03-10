# QuickHire — Simple Job Board Application

A full-stack mini job board built with **Next.js 16** (App Router) and **Express 5** + **MySQL**. Users can browse jobs, filter/search, view details, and apply. Admins can create and delete job listings.

---

## Tech Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Styling  | Tailwind CSS v4                               |
| Icons    | Lucide React                                  |
| Backend  | Node.js, Express 5                            |
| Database | MySQL (mysql2)                                |
| Fonts    | ClashDisplay, Epilogue, Geist                 |

---

## Features

### Core

- **Job Listings** — browse all jobs with keyword search and location search
- **Filters** — sidebar filtering by category and location with count badges
- **Job Detail** — full description with sticky "Apply Now" form (name, email, resume URL, cover note)
- **Admin Panel** — create new jobs, search/filter existing jobs, delete listings, stats overview
- **Responsive** — fully responsive across mobile, tablet, and desktop
- **Reusable Components** — modular component structure with clean naming

### Backend

- RESTful API (`GET /api/jobs`, `GET /api/jobs/:id`, `POST /api/jobs`, `DELETE /api/jobs/:id`, `POST /api/applications`)
- Input validation middleware (required fields, email format, URL validation)
- Clean API response envelope (`{ success, data }` / `{ success, message, errors }`)
- Environment-based configuration via `.env`

### Bonus Items

- Improved admin UI with search, stats row, view-job links, and better form feedback
- Debounced search for smoother filtering
- Skeleton loading cards on job listings page
- Filter count badges on sidebar
- Active filter indicator with clear-all button
- Environment-based configuration (`.env` for both backend and frontend)
- Clean API response formatting with consistent envelope

---

## Project Structure

```
QuickHire/
├── backend/
│   ├── index.js                 # Express server entry
│   ├── package.json
│   ├── .env.example             # Environment variables template
│   ├── controllers/
│   │   ├── jobController.js     # Job CRUD logic
│   │   └── applicationController.js
│   ├── dbConfig/
│   │   ├── db.js                # MySQL connection pool
│   │   └── setupDB.js           # Table creation & seed data
│   ├── middleware/
│   │   └── validate.js          # Input validation (jobs, applications)
│   ├── routes/
│   │   ├── jobRoutes.js         # Job API routes
│   │   └── applicationRoutes.js # Application API routes
│   └── utils/
│       └── response.js          # Standardized response helpers
├── frontend/
│   ├── package.json
│   ├── .env.example             # Frontend env template
│   └── src/
│       ├── app/                 # Next.js App Router pages
│       │   ├── layout.tsx       # Root layout (fonts, header, footer)
│       │   ├── page.tsx         # Landing page
│       │   ├── globals.css      # Tailwind theme & global styles
│       │   ├── jobs/
│       │   │   ├── page.tsx     # Job listings page
│       │   │   └── [id]/
│       │   │       └── page.tsx # Job detail page
│       │   └── admin/
│       │       └── page.tsx     # Admin panel
│       ├── components/
│       │   ├── layout/          # Header, Footer, Container
│       │   ├── home/            # Landing page sections
│       │   ├── jobs/            # JobCard, JobListings, SearchBar, etc.
│       │   └── admin/           # AdminPanel
│       ├── lib/
│       │   ├── api.ts           # API client functions
│       │   └── types.ts         # TypeScript interfaces
│       └── fonts/               # Local ClashDisplay font files
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **MySQL** database (local or remote)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/QuickHire.git
cd QuickHire
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file (see `.env.example`):

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=quickhire
```

Start the server:

```bash
npm run dev
```

The backend will run at `http://localhost:5000`. On first run it automatically creates tables and seeds demo data.

### 3. Set up the Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file (see `.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

The frontend will run at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | `/api/jobs`         | List all jobs            |
| GET    | `/api/jobs/:id`     | Get single job details   |
| POST   | `/api/jobs`         | Create a new job (Admin) |
| DELETE | `/api/jobs/:id`     | Delete a job (Admin)     |
| POST   | `/api/applications` | Submit a job application |

### Response Format

All endpoints return a consistent envelope:

```json
// Success
{ "success": true, "data": { ... } }

// Error
{ "success": false, "message": "Error description", "errors": ["field is required"] }
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable      | Description         | Default |
| ------------- | ------------------- | ------- |
| `PORT`        | Server port         | `5000`  |
| `DB_HOST`     | MySQL host          | —       |
| `DB_PORT`     | MySQL port          | `3306`  |
| `DB_USER`     | MySQL username      | —       |
| `DB_PASSWORD` | MySQL password      | —       |
| `DB_NAME`     | MySQL database name | —       |

### Frontend (`frontend/.env.local`)

| Variable              | Description     | Default                 |
| --------------------- | --------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000` |

---

## Scripts

### Backend

| Script        | Command            | Description            |
| ------------- | ------------------ | ---------------------- |
| `npm run dev` | `nodemon index.js` | Start with auto-reload |

### Frontend

| Script          | Command      | Description             |
| --------------- | ------------ | ----------------------- |
| `npm run dev`   | `next dev`   | Start dev server        |
| `npm run build` | `next build` | Production build        |
| `npm start`     | `next start` | Start production server |

---

## Design Reference

UI is based on the Figma template provided in the task specification, closely following the layout structure, typography, color scheme, and spacing.
