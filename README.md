# 🎬 MovieMon v2

**React + Vite App for browsing movies** using TMDB API, built with component-driven architecture and performance in mind. Designed for educational purposes to demonstrate React, API integration, and component reuse.

---

## 🔗 Live Demo

[https://moviemon-v2.vercel.app](https://moviemon-v2.netlify.app)

## 📦 Repository

[https://github.com/rayhan5497/moviemon-v2](https://github.com/rayhan5497/moviemon-v2)

---

## 🚀 Features

* Browse movies with **search, filters, and infinite scrolling**
* Built with **React (Hooks, functional components) + Vite**
* **Component-driven architecture** with reusable UI logic
* Handles **async data fetching**, loading states, and error cases gracefully
* Focused on **performance, UX, and maintainable code structure**

---

## 🛠️ Tech Stack

* **Frontend:** React, JavaScript (ES6+), HTML5, CSS3 (custom utilities), Tailwind CSS
* **Backend:** Node JS, Express
* **API:** TMDB API

---

## 💡 Learning Highlights

* Implemented **infinite scroll and API pagination**
* Managed **loading/error states** effectively
* Learned **component reuse patterns** in React
* Explored **state management without external libraries**

---

## 🏗 Architecture & Data Flow

```mermaid
flowchart TD

    User["User"] --> Page

    %% =========================
    %% FRONTEND
    %% =========================

    subgraph Frontend

        Page["Pages"]

        Feature["Features (Business Logic)"]

        Shared["Shared (UI + Hooks + Context + Utils + Static Data)"]

        API["API Layer (HTTP Client)"]
    end

    %% =========================
    %% BACKEND
    %% =========================

    subgraph Backend
        Router["Router"]
        Controller["Controller"]
        Service["Service"]
        Repository["Repository"]
        DB[(Database)]
        External["External Services"]
    end


    %% =========================
    %% ACCESS RULES (Frontend)
    %% =========================

    %% Pages can access everything
    Page --> Feature
    Page --> Shared
    Page --> API

    %% Features can access shared + API
    Feature --> Shared
    Feature --> API

    %% Shared should NOT access features
    %% (one directional architecture)

    %% =========================
    %% DATA FLOW
    %% =========================

    API -->|"HTTP Request"| Router
    Router --> Controller
    Controller --> Service
    Service --> Repository
    Repository --> DB
    Service --> External

    DB --> Repository
    Repository --> Service
    Service --> Controller
    Controller -->|"JSON Response"| API
    API --> Page

```

---

## 🤝 Connect

* Portfolio: [https://developer-rayhan.netlify.app](https://developer-rayhan.netlify.app)
* GitHub: [https://github.com/rayhan5497](https://github.com/rayhan5497)
