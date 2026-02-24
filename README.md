# 🍛 Padang Restaurant POS API

A reliable and high-performance Point of Sale (POS) API, specifically designed for streamlining workflows and accelerating the performance of Padang food stalls. This system handles multiple API endpoints consisting of multiple tables and http methods.

## 🚀 Key Features

* **Atomic Transaction Engine**: Ensures data integrity by managing Transaction Headers and Details within a single database transaction.
* **Complex Data Aggregation**: Utilizes PostgreSQL JSON aggregation to return clean, nested JSON structures for frontend consumption.
* **Stock-Aware**: Designed for inventory management and real-time menu tracking.
* **Scalable Schema**: Normalized relational model following industry best practices.

## 🛠 Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: PostgreSQL
* **Security**: JWT-based authentication
* **API Documentation**: RESTful JSON

## 📊 Database ERD

The system is built around a robust relational model to ensure seamless operations between buyers, cashiers, and menu items.



* **Cashier**: Manages staff login, shifts, and accountability.
* **Buyer**: Tracks customer profiles, tables, and loyalty points.
* **Menu**: Centralized inventory with categorical support (Food, Drink, Packages).
* **Transaction & Detail**: A master-detail relationship that allows for unlimited items per receipt with accurate price snapshots.

## 🛣 API Endpoints

### Cashier
* **Create New Cashier Account**
  `POST /api/cashier/new`
* **Login Cashier Account**
  `POST /api/cashier/login`
* **Delete Cashier Account (admin)**
  `DELETE /api/cashier/delete/:id`

### Buyer
* **Create New Cashier Account (auth)**
  `POST /api/buyer/new`
* **Retrieve All Buyer (auth)**
  `GET /api/buyer`
* **Retrieve Specific Buyer ID (auth)**
  `GET /api/buyer/:id`
* **Update Buyer Data (admin)**
  `PUT /api/buyer/update/data/:id`
* **Update Buyer Point (auth)**
  `PUT /api/buyer/update/point/:id`
* **Delete Buyer Data (admin)**
  `DELETE /api/buyer/delete/:id`

### Menu
* **Create new menu (admin)**
  `POST /api/menu/new`
* **Retrieve All Menu**
  `GET /api/menu`
* **Retrieve Specific Menu by ID**
  `GET /api/menu/:id`
* **Update Specific Menu (admin)**
  `PUT /api/menu/update/:id`
* **Delete Specific Menu (admin)**
  `DELETE /api/menu/delete/:id`

### Transaction & Transaction Detail
* **Create New Transaction (auth)**
  `POST /api/transaction/new`
* **Retrieve All Transaction (auth)**
  `GET /api/transaction`
* **Retrieve Specific Transaction (auth)**
  `GET /api/transaction/:id`
* **Delete Specific Transaction (admin)**
  `DELETE /api/transaction/delete/:id`

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abiyyy07/rumah-padang-backend
   cd padang-pos-api
2. **Setup Node**
   ```bash
   npm install
3. **Setup .env**

   Create your own .env file on root folder like below:
   ```bash
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
2. **Run API**
   ```bash
   node app.js
