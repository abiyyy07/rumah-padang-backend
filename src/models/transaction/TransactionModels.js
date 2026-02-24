const db = require('../../config/db')

class TransactionModels {
    // create new transaction
    static async createNewTransaction(id_cashier, total_price, items) {
        try {
            await db.query('BEGIN')

            // query for transaction first
            const txQuery = `INSERT INTO transaction (id_cashier, total_price) VALUES ($1, $2) RETURNING transaction_id`
            const txResult = await db.query(txQuery, [id_cashier, total_price])
            const newTransactionId = txResult.rows[0].transaction_id

            // transaction detail
            const detailQuery = `INSERT INTO transaction_detail (transaction_id, menu_id, amount, unit_price, sub_total, notes) VALUES ($1, $2, $3, $4, $5, $6)`

            for (const item of items) {
                await db.query(detailQuery, [
                    newTransactionId,
                    item.menu_id,
                    item.amount,
                    item.unit_price,
                    item.sub_total,
                    item.notes || ''
                ])
            }
            
            await db.query('COMMIT') // save and store
        } catch (error) {
            await db.query('ROLLBACK');
            throw error
        }
    }

    // retrieve all transactions
    static async retrieveTransactions() {
        const query = `SELECT * FROM transaction`
        const result = await db.query(query)
        return result.rows
    }

    // retrieve specific transaction
    static async retrieveSpecificTransaction(transaction_id) {
        const query = `
        SELECT t.*, 
            (
                SELECT json_agg(td) 
                FROM (
                    SELECT detail_id, menu_id, amount, unit_price, sub_total, notes 
                    FROM transaction_detail 
                    WHERE transaction_id = t.transaction_id
                ) td
            ) AS items
        FROM transaction t
        WHERE t.transaction_id = $1`;
        
        const result = await db.query(query, [transaction_id])
        return result.rows[0]
    }

    // delete transaction
    static async deleteTransaction(transaction_id) {
        try {
            await db.query('BEGIN');
            
            // 1. Hapus anaknya dulu
            await db.query('DELETE FROM transaction_detail WHERE transaction_id = $1', [transaction_id]);
            
            // 2. Baru hapus induknya
            await db.query('DELETE FROM transaction WHERE transaction_id = $1', [transaction_id]);
            
            await db.query('COMMIT');
        } catch (error) {
            await db.query('ROLLBACK');
            throw error;
        }
    }
}

module.exports = TransactionModels