# LeetCode Spaced-Repetition Tracker

A full-stack web application that helps you actually retain what you practice. Solve a problem once, and the app automatically schedules three review sessions so the pattern sticks.

> **Review schedule:** Every solved problem is queued for review at **+4, +7, and +15 days**. Overdue reviews stay visible until you clear them.

---

## ✨ Features

- 🔐 **JWT authentication** — secure registration and login
- ➕ **Problem tracking** — log solved problems with title, URL, difficulty, topic, and notes
- 📅 **Auto-scheduled reviews** — three review dates generated on every submission
- ✅ **Review queue** — a daily list of due and overdue problems to revisit
- 📊 **Dashboard** — stats on total problems, due today, completed reviews, and upcoming
- 📧 **Daily email reminders** — automated morning digest of what's due
- ☁️ **Cloud deployed** — accessible from any device

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, HTML, CSS, JavaScript |
| Backend | Python / FastAPI |
| Database | PostgreSQL (Neon) |
| Email | SMTP (Gmail App Password) or SendGrid |
| Frontend Hosting | Vercel or Netlify |
| Backend Hosting | Render |
| Scheduled Jobs | GitHub Actions |

---

## 🏗 Architecture

```
Users → React Frontend → FastAPI Backend → PostgreSQL (Neon)
                                  ↑
              GitHub Actions → Daily Email Job → User Inboxes
```

---

## 📁 Project Structure

```
leetcode-tracker/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   │
│   ├── routes/
│   │   ├── auth_routes.py
│   │   ├── problem_routes.py
│   │   ├── review_routes.py
│   │   └── dashboard_routes.py
│   │
│   ├── services/
│   │   ├── problem_service.py
│   │   ├── review_service.py
│   │   └── email_service.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## 🗄 Database Schema

<details>
<summary><strong>Users</strong></summary>

```sql
users (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(100),
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

</details>

<details>
<summary><strong>Problems</strong></summary>

```sql
problems (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER REFERENCES users(id),
    title       VARCHAR(255) NOT NULL,
    url         TEXT,
    difficulty  VARCHAR(20),
    topic       TEXT,
    notes       TEXT,
    solved_date DATE NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

</details>

<details>
<summary><strong>Reviews</strong></summary>

```sql
reviews (
    id           SERIAL PRIMARY KEY,
    problem_id   INTEGER REFERENCES problems(id),
    review_date  DATE NOT NULL,
    completed    BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP
)
```

</details>

<details>
<summary><strong>Challenges (planned)</strong></summary>

```sql
challenges (
    id             SERIAL PRIMARY KEY,
    problem_id     INTEGER REFERENCES problems(id),
    challenger_id  INTEGER REFERENCES users(id),
    opponent_id    INTEGER REFERENCES users(id),
    status         VARCHAR(20),   -- pending | active | completed
    started_at     TIMESTAMP,
    winner_id      INTEGER REFERENCES users(id),
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

</details>

---

## 📐 Review Scheduling Logic

When a problem is marked solved, the backend automatically creates three review entries:

| Review | Offset | Example (solved 2026-06-07) |
|---|---|---|
| Review 1 | +4 days | 2026-06-11 |
| Review 2 | +7 days | 2026-06-14 |
| Review 3 | +15 days | 2026-06-22 |

Overdue reviews are never dismissed automatically — they stay in the queue until explicitly marked complete.

```sql
SELECT * FROM reviews
WHERE review_date <= CURRENT_DATE
  AND completed = false;
```

---

## 🔌 API Reference

### Auth
```
POST  /auth/register   — Create new account
POST  /auth/login      — Authenticate and receive JWT
GET   /auth/me         — Fetch current user profile
```

### Problems
```
POST   /problems               — Add a new solved problem
GET    /problems               — List all user problems
GET    /problems/{problem_id}  — Get specific problem
DELETE /problems/{problem_id}  — Remove a problem
```

### Reviews
```
GET    /reviews/due                    — All pending/overdue reviews
GET    /reviews/upcoming               — Future scheduled reviews
PATCH  /reviews/{review_id}/complete   — Mark a review complete
```

### Dashboard
```
GET /dashboard

Response:
{
  "totalProblems":    42,
  "dueToday":          5,
  "completedReviews": 18,
  "upcomingReviews":   9
}
```

---

## 🖥 Frontend Pages

| Page | Purpose |
|---|---|
| Landing | App overview with Login & Register buttons |
| Register | Name, Email, Password, Confirm Password + validation |
| Login | Email & Password — stores JWT on success |
| Dashboard | Stats: total problems, due today, completed, upcoming |
| Add Problem | Title, URL, Difficulty, Topic, Notes, Solved Date |
| Today's Reviews | Due problems with Mark Complete action |
| All Problems | Full list with next review date and status |

---

## 📧 Email Reminders

A GitHub Actions workflow fires every morning and sends each user a personalized digest of their due reviews.

```
Subject: Your LeetCode Reviews for Today

Hi Syed,

You have 4 problems to review today:

  1. Two Sum
  2. Valid Parentheses
  3. Merge Intervals
  4. Coin Change

Keep the streak going!
```

---

## 🗺 Development Phases

**Phase 1 — MVP**
Build all frontend pages using static/mock data. Stand up the database schema and all core APIs. Goal: users can register, log in, add problems, and view due reviews.

**Phase 2 — Integration**
Connect frontend pages to the live backend. Implement the JWT authentication flow. Handle loading and error states. Enable CORS and finalize API response shapes.

**Phase 3 — Email Reminders**
Implement the email service (SMTP or SendGrid). Configure the GitHub Actions daily scheduler. Add an email preference settings page.

**Phase 4 — Deployment**
Deploy the frontend to Vercel or Netlify. Deploy the FastAPI backend to Render with environment variables. Connect Neon PostgreSQL in production.

---

## 👥 Work Distribution

**Person 1 — Frontend**
React project setup & routing · Login, Register, Dashboard, Add Problem, Reviews, and All Problems pages · API integration · JWT authentication flow · Frontend validation & error states · Styling & UI polish · Vercel/Netlify deployment

**Person 2 — Backend**
FastAPI project setup · PostgreSQL schema design & integration · JWT authentication · Problem, Review & Dashboard APIs · Review scheduling logic · Email reminder system · Render deployment · Neon PostgreSQL deployment

---

## 🚀 Future: Multiplayer Challenges

Once the core platform is stable, we plan to add a competitive challenge mode — head-to-head timed problem duels between friends.

**Challenge flow:** Pick a problem → generate a shareable link → friend accepts → synchronized countdown → both users solve in their own environment → results revealed on a shared summary screen.

**Scoring:** Time to first pass, wrong submission penalties, test case partial credit, and a weighted final score.

**Challenge modes:**

| Mode | Description |
|---|---|
| 1v1 Duel | Direct challenge between two users on the same problem |
| Group Race | Up to 5 users compete to solve the same problem first |
| Blind Pick | Challenger picks the problem; opponent doesn't see it until start |
| Rematch | Both users retry a problem with roles swapped |

Challenge state will be synchronized in real time via **WebSockets**.

---

## 📦 Getting Started

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Set your environment variables (database URL, JWT secret, email credentials) before running.

---

## 📄 License

MIT
