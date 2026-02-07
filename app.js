const express = require('express')
const app = express()

// routes
const cashierRoutes = require('./src/routes/cashier/cashierRoutes')

// json
app.use(express.json())

// routes cashier
app.use('/api/cashier', cashierRoutes)

const PORT = 3000
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:300")
})