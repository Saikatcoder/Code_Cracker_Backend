Code Cracker
Code Cracker is a secure and lightweight Node.js backend for authentication built using Express, JWT, Prisma, and MongoDB. It includes user registration, login, token verification, and environment configuration — perfect for learning how to build robust authentication systems from scratch.

🔧 Tech Stack
Backend: Node.js, Express
Database ORM: Prisma
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Security: bcryptjs for password hashing, cookie-parser for session cookies, validator for input validation
Environment Handling: dotenv

📁 Project Structure
.
├── .env                 # Environment variables
├── .gitignore           # Files to ignore in Git
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Version-locked dependency tree
├── prisma/
│   ├── schema.prisma    # Prisma schema file
├── src/
│   ├── config/          # DB config
│   ├── controller/      # Business logic
│   ├── middleware/      # JWT & validation middlewares
│   ├── routes/          # Route definitions
│   └── server.js        # Server entry point
Features
✅ User registration with email & password
✅ Login with JWT token generation
✅ Secure password hashing using bcrypt
✅ Token-based authentication middleware
✅ MongoDB integration via Prisma
✅ Input validation using validator library
✅ Cookie-based session support
Installation & Setup
Make sure Node.js are installed on your system.

Prerequisites
Make sure you have the following installed before running this project:

Node.js (v18+ recommended)
Docker
PostgreSQL
Judge0 API (for code execution)

⚙️ Judge0 Setup (Locally using Docker)
To run the Judge0 API locally for secure and isolated code execution, follow these steps:

# Clone the Judge0 repository
git clone https://github.com/judge0/judge0.git
cd judge0

# Start Judge0 using Docker Compose
docker-compose up -d

# Setup JUDGE0 Locally
<a herf=""></a>

1. **Clone the repository**

```bash
git clone https://github.com/Saikatcoder/codecracker.git
cd codecracker
Install dependencies
npm install
Set up your environment variables
Create a .env file in the root directory and add the following:

PORT=5000
DATABASE_URL=your_postgress_connection_string
JWT_SECRET=your_jwt_secret_key

Prisma setup
npx prisma generate
npx prisma db push
Start the server
npm run dev
Server will be live at http://localhost:8080.

📬 API Endpoints
Method	Route	Description
POST	/register	Register new user
POST	/login	Login existing user
GET	/getuser	Get user info (auth)
Example .env File


PORT=8080
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/mydb?schema=publi
JWT_SECRET=super_secret_jwt_key


✨ Future Improvements
 Email verification system
 Password reset via email
 Role-based authorization
 Rate limiting and security headers
 Frontend integration (React)
🤝 Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

📄 License
ISC

🧠 Author
Developed by Saikat Dutta