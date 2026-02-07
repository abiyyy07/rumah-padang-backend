const db = require('../../config/db')
const bcrypt = require('bcrypt')

class CashierModels {
    // find by email
    static async findByEmail(email) {
        const query = `SELECT * FROM cashiers WHERE email = $1`
        const result = await db.query(query, [email])
        return result.rows[0]
    }

    // create new cashier
    static async createNewCashier(fullNameObj, email, password, phone, fullAddressObj) {
        // hash your password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        // query
        const query = `
            INSERT INTO cashiers (name, email, password, phone, address) 
            VALUES (
                ($1, $2)::full_name, 
                $3, $4, $5, 
                ($6, $7, $8)::full_address
            ) 
            RETURNING *`;

        const values = [
            fullNameObj.first_name, // $1
            fullNameObj.last_name,  // $2
            email,                  // $3
            hashPassword,           // $4
            phone,                  // $5
            fullAddressObj.street,  // $6
            fullAddressObj.city,    // $7
            fullAddressObj.postal_code // $8
        ];

        // result here
        const result = await db.query(query, values)
        return result.rows[0]
    }

    // delete by admin
    static async deleteCashier(id) {
        const query = `DELETE FROM cashiers WHERE id = $1 RETURNING *`
        const result = await db.query(query, [id])
        return result.rows[0]
    }
}

module.exports = CashierModels