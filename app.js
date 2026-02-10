const express = require('express')
const app = express()

// routes
const cashierRoutes = require('./src/routes/cashier/cashierRoutes')
const menuRoutes = require('./src/routes/menu/menuRoutes')
const buyerRoutes = require('./src/routes/buyer/buyerRoutes')
const transactionRoutes = require('./src/routes/transaction/transactionRoutes')

// json
app.use(express.json())

// routes cashier
app.use('/api/cashier', cashierRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/buyer', buyerRoutes)
app.use('/api/transaction', transactionRoutes)

const PORT = 3000
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:300")
})