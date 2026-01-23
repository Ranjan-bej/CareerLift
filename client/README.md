# CareerLift — Setup Guide

CareerLift is divided into two parts:
- **Frontend**: Vite + React  
- **Backend**: Node.js + Express  

Follow the steps below to run the project after cloning.

---

## 📥 1. Clone the Repository
```bash
git clone https://github.com/your-username/careerlift.git
cd careerlift
```

---

# 🚀 Backend Setup (Node + Express)

### 1. Navigate to backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```
PORT=5000
```

### 4. Start the backend server
```bash
npm run dev
```

Backend will run at:
```
http://localhost:5000
```

---

# 💻 Frontend Setup (Vite + React)

### 1. Navigate to frontend folder
```bash
cd ../frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```
VITE_API_URL=http://localhost:5000
```

### 4. Start the frontend server
```bash
npm run dev
```

Frontend will run at:
```
http://localhost:5173
```

---

# ✔️ Run Full Application

### Step 1: Start backend
```bash
cd backend
npm run dev
```

### Step 2: Start frontend (open a new terminal)
```bash
cd frontend
npm run dev
```

---

Your CareerLift app is now running locally! 🚀
