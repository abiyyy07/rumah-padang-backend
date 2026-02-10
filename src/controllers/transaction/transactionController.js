const TransactionModels = require('../../models/transaction/TransactionModels')

// create new transaction
const createNewTransaction = async (req, res) => {
    const { id_buyer, total_price, items } = req.body

    try {
        // id cashier
        const id_cashier = req.user.id

        const transactions = await TransactionModels.createNewTransaction(id_buyer, id_cashier, total_price, items)

        // response and result
        res.status(201).json({
            message: "Success create new transaction!",
            data: transactions
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// retrieve all transactions
const retrieveAllTransaction = async (req, res) => {
    try {
        const transactions = await TransactionModels.retrieveTransactions() // function
        
        // response and result
        res.status(200).json({
            message: "Success retrieve!",
            data: transactions
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// retrieve detail transaction
const retrieveSpecificTransaction = async (req, res) => {
    const { id } = req.params // get id from params

    try {
        // retrieve specific
        const transaction = await TransactionModels.retrieveSpecificTransaction(id)

        // response and return
        res.status(200).json({
            message: "Success retrieve!",
            data: transaction
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// delete transaction by id
const deleteTransaction = async (req, res) => {
    const { id } = req.params // get id from params

    try {
        const deletes = await TransactionModels.deleteTransaction(id) // function

        res.status(200).json({
            message: "Success delete transaction",
            data: deletes
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createNewTransaction, retrieveAllTransaction, retrieveSpecificTransaction, deleteTransaction }