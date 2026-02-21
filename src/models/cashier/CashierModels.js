const db = require('../../config/db')
const bcrypt = require('bcrypt')

class CashierModels {
    // find by email
    static async findByEmail(email) {
        const query = `SELECT * FROM cashier WHERE email = $1`
        const result = await db.query(query, [email])
        return result.rows[0]
    }

    // create new cashier
    static async createNewCashier(first_name, last_name, email, password, phone, street, city, postal_code) {
        // hash your password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        // query
        const query = `
            INSERT INTO cashier (first_name, last_name, email, password, phone, street, city, postal_code) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`;

        const values = [first_name, last_name, email, hashPassword, phone, street, city, postal_code];

        // result here
        const result = await db.query(query, values)
        return result.rows[0]
    }

    // delete by admin
    static async deleteCashier(id) {
        const query = `DELETE FROM cashier WHERE id = $1 RETURNING *`
        const result = await db.query(query, [id])
        return result.rows[0]
    }
}

module.exports = CashierModels