# TaskThozhan

A full-stack web application built with MERN to bridge the gap between employers and employees for short-term or task-based jobs.
The platform supports user registration, login, secure password handling, and efficient job management features for both employers and employees.


## 🔐 Authentication & Security

- **User Roles:**  
  - 👨‍💼 **Employer**: Can register, login, post jobs, and manage applications.  
  - 👷 **Employee**: Can register, login, search for jobs, and apply with a cover letter.

- **Authentication Flow:**  
  - Secure login and registration for both roles.
  - Forgot password functionality is integrated using a mail-sender library (nodemailer) to send reset links or OTPs to the user's registered email.
  - Passwords are securely stored using **bcrypt** hashing for enhanced security.

## 🚀 Features

- User registration and authentication
- Job creation, updation, deletion
- Responsive frontend (React)
- Backend with Express & MongoDB
  

## 📸 Screenshots
### Home page

<img width="1366" height="604" alt="image" src="https://github.com/user-attachments/assets/f0e090cf-64df-4f17-aba4-ea3f98b5d656" />

### Registration

<img width="1347" height="606" alt="image" src="https://github.com/user-attachments/assets/81dc0a14-6b10-48ab-9b6f-00ed7f268b74" />

### Job Portal

<img width="1342" height="586" alt="image" src="https://github.com/user-attachments/assets/ed6f7b92-221a-4ac3-81dc-6ed53988d181" />

### Applications

<img width="1337" height="592" alt="image" src="https://github.com/user-attachments/assets/b856f62f-5ae3-4ac6-b1e1-88fdc3e7fa97" />

### Folder Structure 
<img width="386" height="148" alt="image" src="https://github.com/user-attachments/assets/766051ee-3db3-4b22-aace-7e4188ec9f73" />




## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript(React)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose)
- **Security Libraries:**
  - `bcrypt` – for password hashing
  - `nodemailer` (or equivalent) – for sending password recovery emails
- **Version Control:** Git & GitHub


## 🔧 Installation & Setup

### Prerequisites

- Node.js & npm
- MongoDB Atlas (or local MongoDB)
- Git

### 1. Clone the repository
  - git clone https://github.com/arjunamar5/TaskThozhan.git
  
  - cd TaskThozhan


### 2. Backend Setup
  - cd TaskThozhan_backend
  - npm install
  - npm start

### 3. Frontend Setup
  - cd TaskThozhan_A
  - npm install
  - npm run dev

### 4. Environment Variables
#### Create a .env file in the /taskthozhan_backend folder
  PORT=3000 
  
  MONGO_URI=your_mongo_uri
  
  JWT_SECRET=your_secret



