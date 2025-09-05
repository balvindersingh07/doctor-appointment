# Patient System — Doctor Appointment SPA

A single-page Doctor Appointment web app where patients can register/login, book appointments with file uploads, and view all appointments with a year filter.

## Live Links
- Frontend (Vercel): https://doctor-appointment-5lshwk4c7-balvindersingh07s-projects.vercel.app
- Backend (Render): https://doctor-appointment-siv8.onrender.com
  - Health check: `GET /api/services`

## Tech Stack
- Frontend: React, Redux Toolkit + Thunk, React Router, Tailwind CSS, Axios
- Backend: Node.js, Express.js, MongoDB Atlas (Mongoose)
- Hosting: Vercel (frontend), Render (backend)
- Tests: Vitest + React Testing Library

## Key Features
- **Signup/Login** with validation + success toast
- **Profile page** by default after login (photo preview, name/phone edit, email shown)
- **Book Appointment**: date & time, doctor type, comments, **upload reports** (multipart)
- **My Appointments**: fetch from API, cards UI, **year dropdown filter**, report links
- **Services**: GET & display
- UI extras: Responsive layout, header/sidebar, carousel, card hover, FAQ accordion

## Environment
**Frontend (Vercel/Local)**  
- `VITE_API_BASE_URL` = `https://YOUR-RENDER-APP.onrender.com`

**Backend (Render/Local)**
- `MONGODB_URI` = `mongodb+srv://.../doctor_appointment?...`
- `JWT_SECRET` = `supersecretjwt` (or any strong secret)
- `FRONTEND_ORIGIN` =
  - local dev: `http://localhost:5173`
  - prod: `https://YOUR-VERCEL-APP.vercel.app`

> Render: don’t set `PORT` (Render assigns it).  
> Render Disk for uploads: mount at `/opt/render/project/src/uploads`.

## Run Locally
```bash
# backend
cd backend
npm install
npm start

# frontend (new terminal)
cd frontend
npm install
npm run dev
