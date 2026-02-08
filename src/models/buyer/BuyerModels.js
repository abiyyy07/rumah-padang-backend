const db = require('../../config/db')

class BuyerModels {
    // find unique buyer email
    static async findBuyerEmail(email) {
        const query = `SELECT * FROM buyer WHERE email = $1`
        const result = await db.query(query, [email])
        return result.rows[0]
    }

    // create new buyer
    static async createBuyer(name, email, phone, created_by) {
        const query = `INSERT INTO buyer (name, email, phone, created_by) VALUES ($1, $2, $3, $4) RETURNING *`
        const values = [name, email, phone, created_by]
        const result = await db.query(query, values)
        return result.rows[0]
    }

    // retrieve all buyer
    static async retrieveAll() {
        const query = `SELECT * FROM buyer`
        const result = await db.query(query)
        return result.rows
    }

    // retrieve detail buyer
    static async retrieveDetail(id) {
        const query = `SELECT * FROM buyer WHERE id = $1`
        const result = await db.query(query, [id])
        return result.rows[0]
    }

    // update primary buyer data
    static async updateData(id, data) {
        const { name, email, phone } = data; // declare data want to update

        // basic query and values
        let query = `UPDATE buyer SET `
        const values = [] // penampungan
        const setClause = []

        // put one by one 
        if (name) {
            values.push(name)
            setClause.push(` name = $${values.length}`)
        }
        if (email) {
            values.push(email)
            setClause.push(` email = $${values.length}`)
        }
        if (phone) {
            values.push(phone)
            setClause.push(` phone = $${values.length}`)
        }

        if (setClause.length === 0) return null // if not any update

        values.push(id)
        const idPosition = values.length

        // combine query
        query += setClause.join(', ') + ` WHERE id = $${idPosition} RETURNING *`
        const result = await db.query(query, values)
        return result.rows[0]
    }

    // update buyer's point
    static async updatePoint(id, point) {
        const query = `UPDATE buyer SET point = $1 WHERE id = $2 RETURNING *`
        const values = [point, id]
        const result = await db.query(query, values)
        return result.rows[0]
    }

    // delete buyer data
    static async deleteBuyer(id) {
        const query = `DELETE FROM buyer WHERE id = $1 RETURNING *`
        const result = await db.query(query, [id])
        return result.rows[0]
    }
}

module.exports = BuyerModels