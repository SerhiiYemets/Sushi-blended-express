# 🍣 Sushi Blended Express API

## 🇨🇿 Čeština

### 📌 Popis

Backend API pro sushi aplikaci vytvořený pomocí **Node.js**, **Express** a **MongoDB**.
Podporuje autentizaci, produkty, kategorie a nákupní košík.

---

### 🚀 Funkce

* 🔐 Autentizace (Access + Refresh tokeny v cookies)
* 🛒 Nákupní košík
* 🍱 Produkty a kategorie
* 📂 Menu (aggregation)
* ⚡ REST API
* 🛡 Validace pomocí Joi
* 🧠 Session-based autentizace (bez JWT)

---

### 🛠 Technologie

* Node.js
* Express
* MongoDB + Mongoose
* Pino (logger)
* Celebrate / Joi (validace)

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
MONGO_URL=tvůj_mongodb_connection_string
NODE_ENV=development
FRONTEND_DOMAIN=http://localhost:5173
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
```

#### Produkty

```
GET /api/products
GET /api/products/:id
POST /api/products (admin)
PATCH /api/products/:id (admin)
DELETE /api/products/:id (admin)
```

#### Kategorie

```
GET /api/categories
POST /api/categories (admin)
```

#### Košík

```
GET /api/cart
POST /api/cart
DELETE /api/cart/:productId
DELETE /api/cart
```

---

### ⚠️ Poznámky

* Používá cookies pro autentizaci
* Frontend musí mít `credentials: true`
* V produkci je nutné HTTPS

---

## 🇬🇧 English

### 📌 Description

Backend API for a sushi delivery application built with **Node.js**, **Express**, and **MongoDB**.
Supports authentication, product catalog, categories, and cart functionality.

---

### 🚀 Features

* 🔐 Authentication (Access + Refresh Tokens via cookies)
* 🛒 Shopping cart
* 🍱 Products & categories
* 📂 Menu aggregation
* ⚡ REST API
* 🛡 Validation with Joi
* 🧠 Session-based auth (no JWT)

---

### 🛠 Tech Stack

* Node.js
* Express
* MongoDB + Mongoose
* Pino (logger)
* Celebrate / Joi (validation)

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
MONGO_URL=your_mongodb_connection_string
NODE_ENV=development
FRONTEND_DOMAIN=http://localhost:5173
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
```

#### Products

```
GET /api/products
GET /api/products/:id
POST /api/products (admin)
PATCH /api/products/:id (admin)
DELETE /api/products/:id (admin)
```

#### Categories

```
GET /api/categories
POST /api/categories (admin)
```

#### Cart

```
GET /api/cart
POST /api/cart
DELETE /api/cart/:productId
DELETE /api/cart
```

---

### ⚠️ Notes

* Uses cookies for authentication (httpOnly)
* Requires credentials: true on frontend
* Production requires HTTPS for cookies

---
