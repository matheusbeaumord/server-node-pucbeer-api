const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use(routes);

app.use('/images', express.static(`${__dirname}/images`));

app.listen(3001, () => console.log('Rodando...'));
