// express
const express = require('express')
const router = express.Router()

// middleware
const verifyToken = require('../../middleware/verifyToken')
const isAdmin = require('../../middleware/role/isAdminRole')

// controller
const menuController = require('../../controllers/menu/menuController')

// routes here
router.post('/new', verifyToken, menuController.createNewMenu)
router.get('/', menuController.retrieveAllMenus)
router.get('/:id', menuController.retrieveDetailMenu)
router.put('/update/:id', verifyToken, isAdmin, menuController.updateMenu)
router.delete('/delete/:id', verifyToken, isAdmin, menuController.deleteMenu)

module.exports = router