# 🍣 Sushi Blended Express API

## 🇨🇿 Čeština

### 📌 Popis

Backend API pro sushi aplikaci vytvořený pomocí **Node.js**, **Express** a **MongoDB**.
Podporuje autentizaci, produkty, kategorie, nákupní košík a reset hesla přes email.

---

### 🚀 Funkce

* 🔐 Autentizace (Access + Refresh tokeny v cookies)
* 🔑 Reset hesla přes email (JWT + SMTP)
* 🛒 Nákupní košík
* 🍱 Produkty a kategorie
* 📂 Menu (aggregation)
* ⚡ REST API
* 🛡 Validace pomocí Joi

---

### 🛠 Technologie

* Node.js
* Express
* MongoDB + Mongoose
* Pino (logger)
* Celebrate / Joi (validace)
* JSON Web Token (JWT)
* Nodemailer (email service)
* Handlebars (email templates)

---

### 📦 Instalace

```bash
git clone https://github.com/SerhiiYemets/Sushi-blended-express.git
cd Sushi-blended-express
npm install
```

---

### ⚙️ Proměnné prostředí

Vytvoř `.env` soubor:

```env
PORT=3000
MONGO_URL=tvůj_mongodb_connection_string

JWT_SECRET=tvůj_secret

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=tvůj_smtp_user
SMTP_PASSWORD=tvůj_smtp_password
SMTP_FROM=tvůj_email

FRONTEND_DOMAIN=https://sushi-blended-express-frontend.vercel.app
NODE_ENV=development
```

---

### ▶️ Spuštění

```bash
npm run dev
```

---

### 🌍 Produkce

Nasazeno na Render:
👉 https://sushi-blended-express.onrender.com

---

### 📡 API Endpointy

#### Auth

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
POST /api/auth/request-reset-email
```

---

#### Produkty

```
GET /api/products
GET /api/products/:id
POST /api/products (admin)
PATCH /api/products/:id (admin)
DELETE /api/products/:id (admin)
```

---

#### Kategorie

```
GET /api/categories
POST /api/categories (admin)
```

---

#### Košík

```
GET /api/cart
POST /api/cart
DELETE /api/cart/:productId
DELETE /api/cart
```

---

### ⚠️ Poznámky

* Používá cookies pro autentizaci (httpOnly)
* Frontend musí mít `credentials: true`
* V produkci je nutné HTTPS
* Reset hesla funguje přes email s expiračním JWT tokenem

---

## 🇬🇧 English

### 📌 Description

Backend API for a sushi delivery application built with **Node.js**, **Express**, and **MongoDB**.
Includes authentication, product catalog, categories, shopping cart, and password reset via email.

---

### 🚀 Features

* 🔐 Authentication (Access + Refresh tokens via cookies)
* 🔑 Password reset via email (JWT + SMTP)
* 🛒 Shopping cart
* 🍱 Products & categories
* 📂 Menu aggregation
* ⚡ REST API
* 🛡 Validation with Joi

---

### 🛠 Tech Stack

* Node.js
* Express
* MongoDB + Mongoose
* Pino (logger)
* Celebrate / Joi (validation)
* JSON Web Token (JWT)
* Nodemailer (email service)
* Handlebars (email templates)

---

### 📦 Installation

```bash
git clone https://github.com/SerhiiYemets/Sushi-blended-express.git
cd Sushi-blended-express
npm install
```

---

### ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=your_email

FRONTEND_DOMAIN=https://sushi-blended-express-frontend.vercel.app
NODE_ENV=development
```

---

### ▶️ Run locally

```bash
npm run dev
```

---

### 🌍 Production

Deployed on Render:
👉 https://sushi-blended-express.onrender.com

---

### 📡 API Endpoints

#### Auth

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
POST /api/auth/request-reset-email
```

---

### ⚠️ Notes

* Uses httpOnly cookies for authentication
* Requires `credentials: true` on frontend
* HTTPS is required in production
* Password reset uses JWT with expiration

---
