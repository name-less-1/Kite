# KITE — Citizen OS for India

> Bridging the gap between India's citizens and the opportunities meant for them.

KITE is a civic-tech platform built for the tech-savvy youth of India. It transforms complex government data — schemes, scholarships, laws, jobs, and more — into a clean, interactive experience.

---

## Live Demo

🌐 **Frontend:** https://kite-orpin.vercel.app
⚙️ **Backend API:** https://kite-3cun.onrender.com

---

## What's Inside

```
kite/
├── frontend/   # React app (Create React App)
└── backend/    # Express REST API with MongoDB
```

---

## Features

* **Scheme Explorer** — Browse National and State-level government schemes, filter by category and state
* **Scholarship Finder** — Find active scholarships based on your state and category
* **Legislative View** — Stay updated on recent laws and acts
* **Jan-Seva** — Track civic complaints and submit new ones
* **Antariksh** — ISRO missions and India's space programme
* **Raksha** — India's defense spotlight and recruitment
* **Jobs** — Government job listings
* **Persistent Data** — All data stored and fetched from MongoDB Atlas via APIs

---

## Tech Stack

| Layer      | Tech                                 |
| ---------- | ------------------------------------ |
| Frontend   | React 18, vanilla CSS-in-JS          |
| Backend    | Node.js, Express, MongoDB (Mongoose) |
| Database   | MongoDB Atlas                        |
| Deployment | Vercel (frontend), Render (backend)  |

---

## Architecture

Frontend (React) → Fetch API → Express Backend → MongoDB Atlas

---

## Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
# runs on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm start
# runs on http://localhost:3000
```

> Make sure backend is running before starting the frontend.

---

## API Endpoints

| Method | Endpoint          | Description                                             |
| ------ | ----------------- | ------------------------------------------------------- |
| GET    | `/api/schemes`    | All schemes (filter: `?state=Punjab&category=Students`) |
| GET    | `/api/jobs`       | Government job listings                                 |
| GET    | `/api/laws`       | Recent laws and acts                                    |
| GET    | `/api/complaints` | Civic complaint tracker                                 |
| POST   | `/api/complaints` | Submit a new complaint                                  |

---

## Team

| Role     | Work                                         |
| -------- | -------------------------------------------- |
| Frontend | UI/UX, React components, views               |
| Backend  | Express API, MongoDB integration, deployment |

---

## Roadmap

* [ ] User authentication (JWT) — save schemes, personalized feed
* [ ] Eligibility matcher
* [ ] Hindi / Punjabi / Hinglish language support
* [ ] Mobile app

---

> Built for Bharat 🇮🇳
