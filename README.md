# BenchZero - ESN Operations Suite

BenchZero is an advanced Enterprise Service Provider (ESN) Operations Suite designed to track bench risk, manage recruitment placement pipelines, and generate custom AI matching pitches for consultants.

---

## Repository Structure

The project is structured as a monorepo:
* **[backend](file:///Users/wecraft/Desktop/WORK/zero-bench/backend)**: Spring Boot 2.7.18 backend REST API (Java 11, Maven, PostgreSQL/H2).
* **[frontend](file:///Users/wecraft/Desktop/WORK/zero-bench/frontend)**: React frontend application (Vite, Tailwind CSS v4, Nginx).
* **[docker-compose.yml](file:///Users/wecraft/Desktop/WORK/zero-bench/docker-compose.yml)**: Orchestration script combining backend, frontend, and PostgreSQL database.

---

## Quick Start (Docker Compose)

Ensure Docker Desktop is running on your host system, then execute:

```bash
docker-compose up --build
```

Access the systems at:
* **Client App**: `http://localhost` (Port 80)
* **REST API Server**: `http://localhost:8080`

---

## Documentation Guides

* **[Agent & Skills Integration Guide](file:///Users/wecraft/Desktop/WORK/zero-bench/agent_skills_guide.md)**: Details the skills matrices, the AI resume-to-job matchmaking engine, and API schemas.
* **[Walkthrough Logs](file:///Users/wecraft/.gemini/antigravity-ide/brain/66376f4f-d4a3-4529-9bfb-12ee22c54efe/walkthrough.md)**: Verification verification results and logs for both backend and frontend.

---

## Local Development (No Docker)

### 1. Database Setup
Start PostgreSQL on port `5432` with a database named `benchzerodb`, username `postgres`, and password `postgres` (or modify variables in `application.properties`).

### 2. Launch Backend
```bash
cd backend
./mvnw spring-boot:run
```

### 3. Launch Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
