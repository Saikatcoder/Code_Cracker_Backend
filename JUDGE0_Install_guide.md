# ⚙️ Judge0 Local Installation Guide (Windows + Docker)

Welcome to the local setup guide for Judge0 — an open-source online code execution engine.

This README provides step-by-step instructions for running Judge0 locally using Docker on a Windows machine.

---

## 📌 Table of Contents

- [About Judge0](#about-judge0)
- [Prerequisites](#prerequisites)
- [🚀 Setup Instructions](#setup-instructions)
- [🧪 API Testing](#api-testing)
- [🛑 Stopping Judge0](#stopping-judge0)
- [⚠️ Troubleshooting](#️troubleshooting)
- [🤝 Credits](#credits)

---

## 📚 About Judge0

Judge0 is an open-source API that compiles and runs code in various programming languages. It's perfect for online judges, interview platforms, and code evaluation tools.

---

## ✅ Prerequisites

Before you begin, make sure you have:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Git](https://git-scm.com/download/win) installed
- Windows 10/11 with WSL2 enabled (recommended)
- Internet connection for downloading images

---

## 🚀 [Setup Instructions](#setup-instructions)

### 1. Clone the Repository

```bash
git clone https://github.com/judge0/judge0.git --branch v1.13.1
cd judge0
```

### 2. Start Docker Containers

Make sure Docker Desktop is running, then execute:

```bash
sudo docker-compose pull
sudo docker-compose up -d --force-recreate
```

### 3. Check Running Containers

```bash
sudo docker ps
```

You should see something like:

```
CONTAINER ID   IMAGE                  PORTS
abc12345       judge0/judge0:1.13.1   0.0.0.0:2358->2358/tcp
```

---

## 🧪 API Testing

### ✅ Get Supported Languages

```bash
curl http://localhost:2358/languages
```

### ✅ Submit Code Example (Python)

```bash
curl -X POST http://localhost:2358/submissions?base64_encoded=false \
  -H "Content-Type: application/json" \
  -d '{"language_id":71,"source_code":"print(\"Hello from Judge0\")"}'
```

Copy the returned `token`.

### ✅ Check Submission Result

```bash
curl http://localhost:2358/submissions/<TOKEN>?base64_encoded=false
```

---

## 🛑 Stopping Judge0

To stop and remove all containers:

```bash
sudo docker-compose down
```

---

## ⚠️ Troubleshooting

### Docker Permission Denied?

Use:

```bash
sudo docker ps
```

Or permanently fix with:

```bash
sudo usermod -aG docker $USER
newgrp docker
```

---

## 🤝 Credits

- Official Repo: [Judge0 GitHub](https://github.com/judge0/judge0)
- API Docs: [https://api.judge0.com](https://api.judge0.com)


