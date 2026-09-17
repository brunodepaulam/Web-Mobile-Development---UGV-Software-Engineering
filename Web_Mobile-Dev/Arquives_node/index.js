const express = require('express');
const app = express()
const port = 3000

app.get('/',(req, res) => { res.send('Olámundo!'); })

const pool = require('./db');
app.use(express.json());
const pessoaRoutes = require('./routes/pessoaRoutes');
app.use('/pessoa', pessoaRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
