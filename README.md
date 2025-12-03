# Full Stack CRUD Application  
React + Vite + Bootstrap • Spring Boot • MySQL

A clean and beginner-friendly full-stack CRUD application.

---
<img width="1689" height="819" alt="image" src="https://github.com/user-attachments/assets/f5eb1d32-6992-4f08-a9b3-893d101afd97" />


# Tech Stack

## Frontend
- React  
- Vite  
- Bootstrap  
- Axios  

## Backend
- Java 17+  
- Spring Boot  
- Spring Web  
- Spring Data JPA  
- Maven  

## Database
- MySQL  
- MySQL Workbench  

---

# Features

- Create users  
- List users  
- Edit users  
- Delete users  
- REST API  
- Auto database creation  
- Bootstrap UI  

---

# Project Structure
```
simple-crud-project/
├── backend/
└── frontend/
```


# Backend Setup

## 1. Navigate to backend folder
```bash
cd backend
```

## 2. Update the MySQL configuration
Open the file:
src/main/resources/application.properties

**Paste the following configuration:**
```
spring.datasource.url=jdbc:mysql://localhost:3306/simple_crud_app?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.sql.init.mode=always

server.port=8080
```

**Make sure to replace:**
YOUR_PASSWORD → with your MySQL password
YOUR_USERNAME → change if you use a different MySQL username

## 3. Run the springboot application
```
mvn spring-boot:run
```

once the server starts, it will run at:

Backend Url:
http://localhost:8080

## 4. Database Auto-Creation

Spring Boot will automatically:

-Create the database simple_crud_app
-Create the users table
-Manage AUTO_INCREMENT values
-Update schema based on your entity classes

You can confirm in MySQL Workbench:
```
USE simple_crud_app;
SHOW TABLES;
SELECT * FROM users;

```

## 5. Backend API Endpoints
### GET all users
```
GET /api/users
```
### CREATE a user
```
POST /api/users
```
Example JSON Body:

```
{
  "name": "Sai",
  "email": "sai@example.com",
  "role": "Admin"
}

```
### UPDATE a user
```
PUT /api/users/{id}

```

### DELETE a user
```
DELETE /api/users/{id}

```
### 6. CORS Configuration

Your controller must include:
```
@CrossOrigin(origins = "http://localhost:5173")

```
# Frontend Setup
## 1. Navigate to frontend folder
```
cd frontend
```
## 2. Install dependencies
```
npm install
```
### 3. Start app
```
npm run dev
```
# Run Complete Project

1. Start MySQL
2. Run backend
3. Run frontend
4. Open: http://localhost:5173

# Author
Kriti Bagga



