const Pessoa = require('../models/pessoaModel');

async function listar(req, res) {
    try {
        const pessoas = await Pessoa.listar();
        res.json(pessoas);
    } catch (erro) {
        res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    listar
};