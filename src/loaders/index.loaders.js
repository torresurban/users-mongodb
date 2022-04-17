const ExpressServer = require('./server/express.server');
const config = require('../config/index.config');
const logger = require('./logger/index.logger');

module.exports = async () => {
    
    const server = new ExpressServer();
    //console.log('Express Loaded');
    logger.info('Express Loaded');

    server.start();
    //console.log(`Server listening on port ${config.port}`);
    logger.info(`#######################################
      Server listening on port: ${config.port}
      #######################################
    `);

}

