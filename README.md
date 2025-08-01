# 🏋️ Gym Management System (GMS)

A full-stack Gym Management System built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS.

---

## ⚙️ Tech Stack

- **Frontend:** React, React Router, Axios, Vite, Tailwind CSS *(Bootstrap optional)*  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (MongoDB Atlas for production)  
- **Authentication:** JWT + bcryptjs  
- **Validation & Middleware:** Express Validator *(optional)*, CORS  
- **API Documentation:** Swagger (`swagger-jsdoc` + `swagger-ui-express`)  
- **Deployment:** Docker, Docker Compose, [Vercel / Render / Netlify / Heroku]  

---

## 🧪 Features

- 👥 Member registration and login system  
- 🧑‍💼 Role-based access control: Guest, User, Admin  
- 📝 Add, edit, and search members & memberships  
- 📊 Dashboard with statistics and visual charts  
- 🔒 Secure JWT-based authentication  
- 📂 RESTful API with Swagger documentation  
- 🧹 `/db` endpoint for resetting or seeding the database *(dev only)*  

---

## 🖼️ Screenshots

### 🔐 Login Page
![Login Page](./gms-frontend/public/screenshots/login-page.png)

### 🧑‍💼 Admin Dashboard
![Admin Dashboard](./gms-frontend/public/screenshots/admin-dashboard.png)

### 📋 Member Management
![Member Management](./gms-frontend/public/screenshots/member-management.png)

### 📄 Member Details
![Member Details](./gms-frontend/public/screenshots/member-details.png)

---

## 🐳 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/BlagojPetrov/GymManagementSystem.git
cd GymManagementSystem
