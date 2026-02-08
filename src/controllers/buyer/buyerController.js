const BuyerModels = require('../../models/buyer/BuyerModels')

// create new buyer
const createNewBuyer = async (req, res) => {
    const { name, email, phone } = req.body // payload
    const myId = req.user.id // my id

    try {
        // check if email used
        const exist = await BuyerModels.findBuyerEmail(email)
        if (exist) return res.status(409).json({ message: "Email already used" })

        const buyer = await BuyerModels.createBuyer(name, email, phone, myId) // function

        res.status(201).json({
            message: "New buyer added!",
            data: buyer
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// retrieve all buyer data
const retrieveAllBuyer = async (req, res) => {
    try {
        const buyers = await BuyerModels.retrieveAll() // function

        res.status(200).json({
            message: "Retrieve all successfully!",
            data: buyers
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// retrieve detail buyer
const retrieveDetailBuyer = async (req, res) => {
    const { id } = req.params // get id by params
    
    try {
        const buyer = await BuyerModels.retrieveDetail(id) // function

        res.status(200).json({
            message: "Retrieve successfully!",
            data: buyer
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// update data buyer
const updateDataBuyer = async (req, res) => {
    const { id } = req.params
    const updateData = req.body

    try {
        // check exist buyer
        const isExist = await BuyerModels.retrieveDetail(id)
        if (!isExist) return res.status(404).json({ message: "Not found buyer" })
        
        const updates = await BuyerModels.updateData(id, updateData) // function

        // response and return
        res.status(200).json({
            message: "Update successfully!",
            data: updates
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// update point buyer
const updatePointBuyer = async (req, res) => {
    const { id } = req.params
    const { point } = req.body

    try {
        // check exist buyer
        const buyer = await BuyerModels.retrieveDetail(id)
        if (!buyer) return res.status(404).json({ message: "Not found buyer" })

        const updates = await BuyerModels.updatePoint(id, buyer.point+point)

        res.status(200).json({
            message: `Added ${point} to points`,
            data: updates
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// delete buyer
const deleteBuyer = async (req, res) => {
    const { id } = req.params // get id by params

    try {
        const deletes = await BuyerModels.deleteBuyer(id) // function

        res.status(200).json({
            message: "Buyer deleted successfully!",
            data: deletes
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createNewBuyer, retrieveAllBuyer, retrieveDetailBuyer, updateDataBuyer, updatePointBuyer, deleteBuyer }