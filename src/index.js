const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const config = require('./config');

const { setupWebSocket } = require('./websocket');
const routes = require('./routes');
const database = require('./database');

const { sslEnabled, port } = config;
let credentials;

if (sslEnabled) {
  try {
    const privateKey = fs.readFileSync('sslcert/key.pem', 'utf8');
    const certificate = fs.readFileSync('sslcert/cert.pem', 'utf8');
    credentials = {
      key: privateKey,
      cert: certificate,
      passphrase: config.certPass,
    };
  } catch (error) {
    console.error('SSL is enabled but no "key.pem" and/or "cert.pem" found in sslcert folder'); //eslint-disable-line
    process.exit(1);
  }
}

const app = express();

database.connectMongo();

app.use(cors());
app.use(express.json());
app.use(routes);

const server = sslEnabled ? https.createServer(credentials, app) : http.createServer(app);

setupWebSocket(server);
server.listen(port, () => console.log(`Running on port ${port}`));
