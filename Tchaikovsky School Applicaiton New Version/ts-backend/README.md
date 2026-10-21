# 🚀 Express TypeScript Mongoose Starter

A premium, production-ready boilerplate for building scalable backend applications using **Express**, **TypeScript**, and **MongoDB**.

---

## ✨ Features

- **TypeScript**: First-class support for static typing and modern JS features.
- **Express 5**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB & Mongoose**: Elegant object modeling for MongoDB.
- **Logging**: Integrated with **Pino** and **Pino-HTTP** for high-performance logging.
- **Validation**: Schema-based validation using **Zod**.
- **Security**: Security-minded headers with **Helmet** and **CORS** configuration.
- **Authentication**: JWT-based authentication system ready to go.
- **Linting & Formatting**: Pre-configured with **ESLint** and **Prettier**.
- **Modern Directory Structure**: Organized for scalability and maintainability.

---

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v18 or later)
- **pnpm** (preferred) or npm/yarn
- **MongoDB** instance (local or Atlas)

### ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ts-backend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and provide your configuration:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/your-db-name
   ```

4. **Run in Development**
   ```bash
   pnpm dev
   ```

---

## 📂 Project Structure

```text
src/
├── controllers/    # Request handlers
├── lib/            # Shared libraries (DB, Logger)
├── middleware/     # Custom Express middleware
├── models/         # Mongoose schemas/models
├── routes/         # API route definitions
├── app.ts          # Express app configuration
├── config.ts       # Environment configuration
└── server.ts       # Entry point
```

---

## 📜 Available Scripts

| Script           | Description                                            |
| :--------------- | :----------------------------------------------------- |
| `pnpm dev`       | Starts the development server with nodemon and ts-node |
| `pnpm build`     | Compiles the TypeScript code to JavaScript             |
| `pnpm start`     | Runs the compiled application in production            |
| `pnpm typecheck` | Runs the TypeScript compiler for type checking         |
| `pnpm lint`      | Lints the codebase using ESLint                        |
| `pnpm format`    | Formats the codebase using Prettier                    |

---

## �️ API Endpoints

### User Routes (`/api/v1/users`)

| Method | Endpoint | Description        |
| :----- | :------- | :----------------- |
| `GET`  | `/`      | Retrieve all users |

---

## �🛡️ License

This project is licensed under the **ISC License**.
