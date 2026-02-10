// express
const express = require('express')
const router = express.Router()

// middleware
const verifyToken = require('../../middleware/verifyToken')
const isAdmin = require('../../middleware/role/isAdminRole')

// controller
const transactionController = require('../../controllers/transaction/transactionController')

// routes
router.post('/new', verifyToken, transactionController.createNewTransaction)
router.get('/', verifyToken, transactionController.retrieveAllTransaction)
router.get('/:id', verifyToken, transactionController.retrieveSpecificTransaction)
router.delete('/delete/:id', verifyToken, isAdmin, transactionController.deleteTransaction)

module.exports = router