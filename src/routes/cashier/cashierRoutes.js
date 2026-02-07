// express
const express = require('express')
const router = express.Router()

// middleware

// controller
const cashierController = require('../../controllers/cashier/cashierController')

router.post('/new', cashierController.createNewCashier)
router.post('/login', cashierController.loginCashier)

module.exports = router