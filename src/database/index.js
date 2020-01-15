const mongoose = require('mongoose');
const { database } = require('../config');

module.exports = {
  connectMongo() {
    const { host, user, password } = database;

    const mongoUri = `mongodb+srv://${user}:${password}@${host}/week10?retryWrites=true&w=majority`;

    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  },
};
