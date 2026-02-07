// express
const express = require('express')
const router = express.Router()

// middleware
const verifyToken = require('../../middleware/verifyToken')
const isAdmin = require('../../middleware/role/isAdminRole')

// controller
const cashierController = require('../../controllers/cashier/cashierController')

router.post('/new', cashierController.createNewCashier)
router.post('/login', cashierController.loginCashier)
router.delete('/delete/:id', verifyToken, isAdmin, cashierController.deleteCashierByAdmin)

module.exports = router