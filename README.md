
#  E-Commerce Web Application

This project is an **academic e-commerce system** built with **Node.js, Express.js, MongoDB, and Vite (React/Angular)**.
It demonstrates **secure web development practices** such as authentication, authorization, input validation, password hashing, and secure API communication.

---

##  Features

*  **User Authentication & Authorization** (JWT, password hashing, salting)
*  **Product Management** (add, update, delete, list products)
*  **Cart & Orders**
*  **Secure Payment Flow** (academic demo, not connected to real gateway)
*  **Data Validation & Middleware Protection**
*  **Information Security Measures**

  * Input sanitization
  * CORS handling
  * Helmet for HTTP security headers
  * Rate limiting for brute force prevention

---

##  Tech Stack

**Frontend:** Vite + React (or Angular)
**Backend:** Node.js + Express.js
**Database:** MongoDB (Mongoose ORM)
**Security Tools:** Helmet, bcrypt, JWT, nodemon

---

##  Installation Guide

### 1️ Clone the Repository

```bash
git clone <your-repo-url>
cd ecommerce-project
```

---

### 2️ Frontend Setup (Vite)

```bash
cd frontend
npm install
npm run dev
```

* Runs on: `http://localhost:5173`

---

### 3️ Backend Setup (Node.js + Express)

```bash
cd backend
npm install
npm install --save-dev nodemon
```

#### Example `package.json` scripts:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Run in development:

```bash
npm run dev
```

* Runs on: `http://localhost:3001`

---

##  Security Considerations

* **Passwords:** Stored using bcrypt hashing + salting
* **Authentication:** JWT access + refresh tokens
* **CORS Policy:** Restricted frontend origin
* **Helmet:** Adds secure HTTP headers
* **Rate Limiting:** Mitigates brute-force login attempts
* **Validation Middleware:** Prevents malicious inputs

---

##  Project Structure

```
ecommerce-project/
│── frontend/          # Vite + React/Angular frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
│── backend/           # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
│
└── README.md
```

---

##  Running the Project

1. Start **backend**:

   ```bash
   cd backend && npm run dev
   ```
2. Start **frontend**:

   ```bash
   cd frontend && npm run dev
   ```
3. Open in browser:

   ```
   http://localhost:5173
   ```


##  Envirnment Variables
Backend =>
```
MONGO_URI=mongodb+srv://User:bJRtFLO4QYEKSAez@cluster0.qjxjquj.mongodb.net/MernAcademic?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
BETTER_AUTH_SECRET=QqZOXYgcTN2jVZDjazrVXh56Uq797ZGC
BETTER_AUTH_URL=http://localhost:5173

EMAIL_SERVICE=gmail
SESSION_KEY=your_session_key
FRONTEND_URL=http://localhost:5173/

SMTP_SECURE=false




NODE_ENV=development


# Database


# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_REFRESH_EXPIRES_IN=30d

# Frontend URL
SAML_ENTRY_POINT=https://your-idp.com/sso
SAML_ISSUER=https://your-app.com/metadata
SAML_CALLBACK_URL=https://your-app.com/auth/saml/acs
SAML_LOGOUT_URL=https://your-idp.com/slo
SAML_LOGOUT_CALLBACK_URL=https://your-app.com/auth/saml/slo/callback
SAML_CERT=-----BEGIN CERTIFICATE-----\nYour IdP Certificate Here\n-----END CERTIFICATE-----
SAML_PRIVATE_CERT=-----BEGIN PRIVATE KEY-----\nYour Private Key Here\n-----END PRIVATE KEY-----


# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_NAME=E-Commerce
FROM_EMAIL=your-email@gmail.com

# Google OAuth (optional)
GOOGLE_CLIENT_ID=514168454442-8n8em5guvcfv2qvvnetqoco16fp5i1p9.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```
Frontend=>
```
REACT_APP_APP_NAME=E-Commerce
REACT_APP_API_URL=http://localhost:3001/api
```
---


