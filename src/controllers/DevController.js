const axios = require('axios');

const Dev = require('../models/Dev');
const { findConnections, sendMessage } = require('../websocket');

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const developers = await Dev.find();
    return res.json(developers);
  },

  async store(req, res) {
    const {
      github_username: githubUsername,
      techs,
      latitude,
      longitude,
    } = req.body;

    let developer = await Dev.findOne({ githubUsername });

    if (!developer) {
      const apiResponse = await axios.get(`https://api.github.com/users/${githubUsername}`);

      const { name, login, avatar_url: avatarUrl, bio } = apiResponse.data; // eslint-disable-line no-undef

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      developer = await Dev.create({
        githubUsername,
        name: name || login,
        avatarUrl,
        bio,
        techs: techsArray,
        location,
      });

      const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray);

      sendMessage(sendSocketMessageTo, 'new-dev', developer);
    }

    return res.json(developer);
  },

  // async update() {

  // },

  // async destroy() {

  // },
};
