const pool = require('../db');

async function listar() {
    const result = await pool.query('SELECT * FROM pessoa ORDER BY id_pessoa');
    return result.rows;
}


module.exports = {
    listar,
    
};