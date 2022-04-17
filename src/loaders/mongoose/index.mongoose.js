const mongoose = require('mongoose');
const config = require('../../config/index.config')

module.exports = async () => {
    await mongoose.connect(config.databaseURL);
}