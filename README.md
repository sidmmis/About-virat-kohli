# DormEase - Hostel Management (MERN + Vite + Tailwind)

A production-ready hostel management website with role-based access for Students and Admins.

## Stack
- Frontend: React (Vite), React Router, Redux Toolkit, TailwindCSS
- Backend: Node.js, Express, MongoDB (Mongoose), JWT

## Features
- Auth: Login/Signup with JWT, role-based (student/admin)
- Student: View mess menu, submit complaints, apply for leave, track statuses
- Admin: Manage mess menu (CRUD), resolve complaints, approve/reject leaves

## Monorepo Structure
```
/frontend
  src/components
  src/pages
/backend
  src/models
  src/routes
  src/controllers
```

## Prerequisites
- Node.js 18+
- MongoDB running locally or connection string for Atlas

## Setup

1) Backend
```
cd backend
cp .env.example .env
# update .env with your Mongo URI and JWT secret
npm install
npm run seed:menu   # optional: seed weekly mess menu
npm run dev         # start API on http://localhost:5000
```

2) Frontend
```
cd frontend
cp .env.example .env
# set VITE_API_URL if backend not on http://localhost:5000/api
npm install
npm run dev         # start app on http://localhost:5173
```

## Default URLs
- API Base: http://localhost:5000/api
- Web: http://localhost:5173

## Notes
- Create an admin by signing up and selecting the Admin role.
- TailwindCSS is configured via PostCSS; classes are available globally.
- Update CORS origin in `backend/server.js` if deploying.

## Scripts
- Backend: `npm run dev`, `npm run start`, `npm run seed:menu`
- Frontend: `npm run dev`, `npm run build`, `npm run preview`

## Production
- Serve frontend build via any static host.
- Deploy backend to a Node environment with MongoDB.
