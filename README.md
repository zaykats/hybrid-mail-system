# 📬 Hybrid Mail System (LRH)

**Hybrid Mail System (LRH)** – A digital-to-physical hybrid mail platform that enables users to securely send letters online, which are then printed at local post offices and delivered physically. Built with **Flask (backend)**, **React + Vite (frontend)**, **MongoDB**, and **Docker**.

**Project by:** Zaynab Er-reghay  
**Program:** Data Science & Artificial Intelligence  
**Location & Date:** Rabat, July 2025  

---

## 🎯 Objective
Modernize the traditional letter-sending process by offering a **hybrid system** that:
- Allows secure digital submission via a web platform.
- Ensures physical delivery through postal services after local printing.

---

## ✨ Features

### Client Side
- Sign-up & authentication with SMS verification.
- Dashboard for quick access: letter creation, tracking, history, and profile management.
- Letter creation: choose from templates or write freely.
- Tracking system with unique IDs (`idClient_date_time_idDest`).
- Delivery notifications via SMS.

### Admin Side (Post Offices)
- Management of incoming digital letters.
- Tracking of print and delivery status.
- Centralized admin dashboard for oversight and operations.

---

## 🛠️ Tech Stack

### Backend
- **Flask (Python)** – RESTful API  
- **MongoDB** – Database for users, letters, and statuses  
- **Docker** – Containerization for consistent, isolated environments across development and production. Docker simplifies complex setups—especially valuable for AI/ML and full-stack apps—and integrates seamlessly with CLI workflows and modern IDEs.

### Frontend
- **React (Vite + TypeScript)** – Fast, modern user interface  
- **TailwindCSS + ShadCN/UI** – Responsive, accessible UI components  
- **Context API** – Lightweight state management (for auth, language, etc.)
- **Node.js** – A free, open-source, cross-platform JavaScript runtime that lets developers build web apps, servers, and tooling. Powers the Vite development server and frontend build pipeline.

---

## 🚀 Getting Started

### Prerequisites
- **[Docker](https://www.docker.com/get-started)** – Used to containerize the entire stack (backend, frontend, database) for reproducible, secure, and portable deployments.
- **[Node.js](https://nodejs.org/) ≥ v18** – Required only if running the frontend separately during development.

---

### Run with Docker Compose
Clone the repository:
```bash
git clone https://github.com/<your-username>/hybrid-mail-system.git
cd hybrid-mail-system
docker-compose up --build



## 🌐 Services lancés

- **Backend (Flask API)** : [http://localhost:5000](http://localhost:5000)  
- **Frontend (React)** : [http://localhost:5173](http://localhost:5173)  
- **MongoDB** : `localhost:27017`  

---

## ⚙️ Mode Développement

### Backend
```bash
cd backend
pip install -r requirements.txt
flask run --host=0.0.0.0 --port=5000


📂 Structure du projet
Backend (/backend)
backend/
├── app.py
├── models/         # Contient les modèles de données
├── routes/         # Définit les routes de l'API
├── services/       # Services et logique métier
├── requirements.txt
└── Dockerfile

Frontend (/frontend)
frontend/
├── App.tsx
├── main.tsx
├── index.css
├── vite-env.d.ts
├── components/
│   ├── auth/       # LoginForm.tsx, RegisterForm.tsx
│   ├── home/       # HeroSection.tsx
│   ├── layout/     # Header.tsx, Footer.tsx
│   ├── letter/     # AIGenerator.tsx, VoiceRecorder.tsx
│   └── ui/         # Buttons, cards, forms, etc.
├── contexts/       # LanguageContext.tsx
├── hooks/          # use-toast.ts, use-mobile.tsx
├── lib/            # utils.ts
└── pages/          # AdminDashboard.tsx, Dashboard.tsx, CreateLetter.tsx, Tracking.tsx, etc.

Root
.
├── backend/
├── frontend/
├── docker-compose.yml
└── README.md
