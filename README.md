# Expense-Tracker-with-Sync

This is a **Full-Stack Expense Tracker** application with:

- 🔷 **React Web App** (for desktop/browser use)
- 🔶 **React Native (Expo) Mobile App** with offline support
- ⚙️ **Node.js + Express + MongoDB Backend** API

The mobile app works offline and syncs with the backend when online using a **timestamp-based sync** approach.

---

## 📁 Project Structure
1. server  -  Node.js + Express + MongoDB API
2. web -  React.js web application
3. mobile/ -  React Native (Expo) offline app

## 🌐 Server Folder (Backend)

# Deploy link - 
https://expense-tracker-be-8n3q.onrender.com

### 🔹 Features
RESTful API to manage expenses

# Routes:

GET /expenses - Fetch all expenses(with lastSyncTime filter)

POST /expenses - Add new expense

DELETE /expenses/:id - Soft delete (sets isDeleted: true)

Uses MongoDB for storage

CORS enabled for frontend access

### 🛠️ Tech Stack
Node.js

Express.js

MongoDB + Mongoose

dotenv for config

# To run:
1. npm install
2. npm run start

## 🌐 React Web App

# Deploy link - 
https://fabulous-empanada-b16780.netlify.app

### 🔹 Features

- Add new expenses
- View expense list in a table with lastSyncTime filter
- Delete expenses
- Shows "Delete" button in red if `isDeleted: true`, otherwise green
- Connects with backend API
- Uses Redux for state management

### 🛠️ Tech Stack

- React.js
- Redux / Redux Thunk
- Axios
- React Router

# To run:
1. cd web
2. npm install
3. npm start

## 🌐 React Native Mobile App (Expo)
### 🔹 Features
Add expenses with amount, category, date

Offline support with AsyncStorage

Swipe-to-delete using gestures

FlatList for performance

Sync logic (timestamp-based, ready to connect with backend)

### 🛠️ Tech Stack
React Native + Expo

AsyncStorage

react-native-gesture-handler

react-native-reanimated

# To run:
1. cd mobile
2. cd my-app
3. npm install
4. npx start

### 📝 Offline Sync Overview
This app supports offline-first expense tracking with automatic background sync.

# 🔁 How Offline Sync Works
Offline Add:
When you add a new expense while offline, it’s saved locally (using AsyncStorage). Once the device is back online, these are sent to the server via a sync process.

Offline Delete:
When deleting an expense offline, the item is removed from the UI and stored in a "delete queue." When back online, it will be deleted from the server.

Startup Sync:
On app start, the app tries to:

Load cached expenses from local storage.

Fetch latest expenses from the server.

Merge and deduplicate them by _id.

Attempt to sync any offline additions or deletions.

Sync Trigger:
Sync runs on app launch and after successful network reconnection. You can also manually trigger it if needed.

