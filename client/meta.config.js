'use strict';

const { join } = require('path');
const { NAME, URL } = require('./constants');

const SOCIAL_IMAGE_PATH = 'images/social/twitter-card.png';
const SOCIAL_IMAGE_URL = join(URL, SOCIAL_IMAGE_PATH);

module.exports = {
  title: NAME,
  description: "Lisbon's public transportation, in real-time",
  social: {
    twitter: {
      image: SOCIAL_IMAGE_URL
    },
    facebook: {
      image: SOCIAL_IMAGE_URL
    }
  }
};
