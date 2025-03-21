# 🗂️ Task Management App (Full Stack)

This is a full-stack task management application built with **React** (frontend), **Node.js + Express** (backend), and **MongoDB** (database). The project is structured into two main folders: `frontend/` and `backend/`.

---

## 🚀 Getting Started

Follow these steps to test this project on your local system.

---

###  1. Fork and Clone the Repository

First, fork this repository on GitHub, then clone it to your local machine:

```bash
git clone https://github.com/YOUR-USERNAME/TaskManagementApp_FullStack.git
cd TaskManagementApp_FullStack
```

###  2. Frontend Setup

Navigate to the frontend folder and start the React app:

bash
Copy
Edit
cd frontend
npm install
npm start
This will start the frontend at http://localhost:3000

###  3. Backend Setup
Open a new terminal, then go back to the root and start the backend:

bash
Copy
Edit
cd ../backend
npm install
nodemon app.js
This starts the backend server at http://localhost:5000

### 🛢️ 4. MongoDB Database Setup
Go to MongoDB Atlas and create a free cluster.
Create a new database and a collection.
Click on "Connect" → "Connect your application", and copy the connection string.
Create a .env file inside backend/ folder with the following:
env
Copy
Edit
bash```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<your-db-name>?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=yourSecretKeyHere
```
Replace placeholders with your actual values.

✅ You're All Set!
Frontend: http://localhost:3000
Backend: http://localhost:5000
MongoDB: Connected via .env

🧠 Tech Stack
Frontend: React, JavaScript, HTML, CSS
Backend: Node.js, Express
Database: MongoDB (via Mongoose)
Auth: JWT

📬 Contributing
Feel free to open issues or submit pull requests if you'd like to contribute or improve this project!

🛡️ License
This project is licensed under the MIT License.
