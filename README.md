# KITE — Citizen OS for India

> Bridging the gap between India's citizens and the opportunities meant for them.

KITE is a civic-tech platform built for the tech-savvy youth of India. It transforms complex government data — schemes, scholarships, laws, jobs, and more — into a clean, interactive experience.

---

## Live Demo

🌐 **Frontend:** [kite-orpin.vercel.app](https://kite-orpin.vercel.app)  
⚙️ **Backend API:** [kite-3cun.onrender.com](https://kite-3cun.onrender.com)

---

## What's Inside

```
kite/
├── frontend/   # React app (Create React App)
└── backend/    # Express REST API (Node.js)
```

---

## Features

- **Scheme Explorer** — Browse National and State-level government schemes, filter by category and state
- **Scholarship Finder** — Find active scholarships based on your state and category
- **Legislative View** — Stay updated on recent laws and acts
- **Jan-Seva** — Track civic complaints and local alerts
- **Antariksh** — ISRO missions and India's space programme
- **Raksha** — India's defense spotlight and recruitment
- **Jobs** — Government job listings

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, vanilla CSS-in-JS |
| Backend | Node.js, Express |
| Deployment | Vercel (frontend), Render (backend) |

---

## Running Locally

### Backend
```bash
cd backend
npm install
node server.js
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

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/schemes` | All schemes (filter: `?state=Punjab`) |
| GET | `/api/jobs` | Government job listings |
| GET | `/api/laws` | Recent laws and acts |
| GET | `/api/complaints` | Civic complaint tracker |

---

## Team

| Role | Work |
|---|---|
| Frontend | UI/UX, React components, views |
| Backend | Express API, state filtering, deployment |

---

## Roadmap

- [ ] MongoDB integration (replace mock data)
- [ ] User auth (JWT) — save schemes, personalized feed
- [ ] Eligibility matcher
- [ ] Hindi / Punjabi / Hinglish language support
- [ ] Mobile app

---

> Built for Bharat 🇮🇳
