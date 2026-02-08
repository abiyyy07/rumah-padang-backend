const express = require('express')
const app = express()

// routes
const cashierRoutes = require('./src/routes/cashier/cashierRoutes')
const menuRoutes = require('./src/routes/menu/menuRoutes')

// json
app.use(express.json())

// routes cashier
app.use('/api/cashier', cashierRoutes)
app.use('/api/menu', menuRoutes)

const PORT = 3000
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:300")
})