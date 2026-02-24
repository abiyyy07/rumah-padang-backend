const db = require('../../config/db')

class MenuModels {

    // create new menu
    static async createMenu(name, desc, stock, price, category) {
        const query = `INSERT INTO menu (name, "desc", stock, price, category) VALUES ($1, $2, $3, $4, $5) RETURNING *`
        const values = [name, desc, stock, price, category]
        const result = await db.query(query, values)
        return result.rows[0]
    }

    // retrieve all menus (semua)
    static async retrieveAll() {
        const query = `SELECT * FROM menu`
        const result = await db.query(query)
        return result.rows
    }

    // retrieve detail menus (satu)
    static async retrieveDetail(id) {
        const query = `SELECT * FROM menu WHERE id = $1`
        const result = await db.query(query, [id])
        return result.rows[0]
    }

    // update menus
    static async updateMenu(id, data) {
        // declare data here (as payload)
        const {name, desc, price, stock, category} = data;

        let query = `UPDATE menu SET `;
        const values = [];
        const setClause = [];

        // declare one by one
        if (name) {
            values.push(name)
            setClause.push(` name = $${values.length}`)
        }
        if (desc) {
            values.push(desc)
            setClause.push(` desc = $${values.length}`)
        }
        if (stock) {
            values.push(stock)
            setClause.push(` stock = $${values.length}`)
        }
        if (price) {
            values.push(price)
            setClause.push(` price = $${values.length}`)
        }
        if (category) {
            values.push(category)
            setClause.push(` category = $${values.length}`)
        }

        if (setClause.length === 0) return null;

        // push id
        values.push(id)
        const idPosition = values.length

        // combine the query
        query += setClause.join(', ') + ` WHERE id = $${idPosition} RETURNING *`
        
        // result
        const result = await db.query(query, values)
        return result.rows[0]
    }

    // delete menu
    static async deleteMenu(id) {
        const query = `DELETE FROM menu WHERE id = $1 RETURNING *`
        const result = await db.query(query, [id])
        return result.rows[0]
    }
    
}

module.exports = MenuModels