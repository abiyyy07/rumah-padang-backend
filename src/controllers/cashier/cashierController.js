const CashierModels = require('../../models/cashier/CashierModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// regist new cashier
const createNewCashier = async (req, res) => {
    const {first_name, last_name, email, password, phone, street, city, postal_code} = req.body

    try {
        // check exist email
        const isExist = await CashierModels.findByEmail(email)
        if (isExist) return res.status(403).json({ message: "Email already used" }) // if email exist

        const cashier = await CashierModels.createNewCashier(first_name, last_name, email, password, phone, street, city, postal_code)

        // response and result
        res.status(201).json({
            message: "Success created",
            data: cashier
        })
    } catch (error) {
        // error handling
        res.status(500).json({ error: error.message })
    }
}

// login to cashier account
const loginCashier = async (req, res) => {
    const { email, password } = req.body

    try {
        // check registered email
        const user = await CashierModels.findByEmail(email)
        if (!user) return res.status(404).json({ message: "Email not registered" })
        
        // check match
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(403).json({ message: "Email or Password not match" })

        // assign the token to yours
        const token = jwt.sign(
            {id: user.id, email: user.email, role: user.role}, 
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        // return token
        res.json({
            message: "Login successfuly!",
            token: token
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// delete cashier by admin
const deleteCashierByAdmin = async (req, res) => {
    const { id } = req.params

    try {
        const deletes = await CashierModels.deleteCashier(id) // function

        // response nya
        res.status(200).json({
            message: "Deleted successfuly",
            deletes
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createNewCashier, loginCashier, deleteCashierByAdmin }