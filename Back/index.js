const express = require('express');
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());

app.get('/', (req, res) => { res.send('Olá mundo !'); })

const pool = require('./db');
app.use(express.json());
const pessoaRoutes = require('./routes/pessoaRoutes');
app.use('/pessoas', pessoaRoutes);

const cargoRoutes = require('./routes/cargoRoutes');
app.use('/cargo', cargoRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

