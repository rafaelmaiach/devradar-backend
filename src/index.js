require('./config');

const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const database = require('./database');

const app = express();

database.connectMongo();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
