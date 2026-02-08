const MenuModels = require('../../models/menu/MenuModels')

// create new controller
const createNewMenu = async (req, res) => {
    const { name, description, price, stock } = req.body
    
    try {
        const menus = await MenuModels.createMenu(name, description, price, stock) // function create

        // response and return
        res.status(201).json({
            message: "Data added successfully!",
            data: menus
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// retrieve all data menus
const retrieveAllMenus = async (req, res) => {
    try {
        const menus = await MenuModels.retrieveAll() // function retrieve

        // response and return 
        res.status(200).json({
            message: "Retrieve data success!",
            data: menus
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// retrieve detail
const retrieveDetailMenu = async (req, res) => {
    const { id } = req.params // get id from params

    try {
        const menus = await MenuModels.retrieveDetail(id) // function retrieve detail

        // response and result
        res.status(200).json({
            message: "Retrieve data success!",
            data: menus
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// update menu
const updateMenu = async (req, res) => {
    const { id } = req.params // params id
    const updateData = req.body // body update

    try {
        // check first is exist menu
        const exist = await MenuModels.retrieveDetail(id)
        if (!exist) return res.status(404).json({ message: "There is not menu in this ID" })
        
        // update
        const updates = await MenuModels.updateMenu(id, updateData)

        // response and return
        res.status(200).json({
            message: "Data updated!",
            data: updates
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// delete menu
const deleteMenu= async (req, res) => {
    const { id } = req.params // get id from params

    try {
        const deletes = await MenuModels.deleteMenu(id) // function delete

        // response and result
        res.status(200).json({
            message: "Data menu has deleted",
            data: deletes
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createNewMenu, retrieveAllMenus, retrieveDetailMenu, updateMenu, deleteMenu }