const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const config = require('./config');

const routes = require('./routes');
const database = require('./database');

const app = express();

const privateKey = fs.readFileSync('sslcert/key.pem', 'utf8');
const certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');

if (!privateKey && !certificate) {
  console.error('No "key.pem" and/or "cert.pem" found in sslcert folder'); //eslint-disable-line
  process.exit(1);
}

const credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: config.certPass,
};

database.connectMongo();

app.use(cors());
app.use(express.json());
app.use(routes);

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3333);
