// express
const express = require('express')
const router = express.Router()

// middleware
const verifyToken = require('../../middleware/verifyToken')
const isAdmin = require('../../middleware/role/isAdminRole')

// controller
const buyerController = require('../../controllers/buyer/buyerController')

// routes here
router.post('/new', verifyToken, isAdmin, buyerController.createNewBuyer)
router.get('/', verifyToken, buyerController.retrieveAllBuyer)
router.get('/:id', verifyToken, buyerController.retrieveDetailBuyer)
router.put('/update/data/:id', verifyToken, isAdmin, buyerController.updateDataBuyer)
router.put('/update/point/:id', verifyToken, buyerController.updatePointBuyer)
router.delete('/delete/:id', buyerController.deleteBuyer)

module.exports = router