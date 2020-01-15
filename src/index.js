require('./config');

const express = require('express');

const routes = require('./routes');
const database = require('./database');

const app = express();

database.connectMongo();

app.use(express.json());
app.use(routes);

app.listen(3333);
