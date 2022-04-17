const express = require('express');
const config = require('../../config/index.config');
const morgan = require('morgan');
const logger = require('../logger/index.logger');
const swaggerUi = require('swagger-ui-express');

class ExpressServer {

    constructor(){
        this.app = express();
        this.port = config.port;
        this.basePathUser = `${config.api.prefix}/users`;

        this._middlewares();

        this._swaggerConfig();
        this._routes();

        this._notFound();
        this._errorHandler();

        
        
    }
    // se puso con guión bajo para que no se pueda acceder desde fuera
    // ya que es una funcion privada
    _middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(morgan('tiny'));
    }

    _routes(){

        //cuando pasamos nuestra aplicacion al area de infraestructura para que lo 
        // deploye en un servidor, ellos tienen una aplicacion que monitorean a todas
        // las otras aplicaciones y que notifican cuando una de ellas cae.
        this.app.head('/status', (req, res) => {
            res.status(200).end();
        })

        this.app.use(this.basePathUser, require('../../routes/users.routes')); 
    }

    //estamos armando nuestro propio middleware de error
    //la cual se le esta agregando dos atributos
    //status y code
    _notFound(){
        this.app.use((req, res, next)=> {
            const err = new Error('Not Found');
            
            err.code = 404;
            next(err)
        })
    }

    //manejador de errores
    _errorHandler(){
        this.app.use((err, req, res, next) => {
            const code = err.code || 500;

            logger.error(`${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            logger.error(err.stack );

            res.status(code);
            const body ={
                error: {
                    code,
                    message: err.message
                }
            }
            res.json(body);
        })
    }

    _swaggerConfig(){
        this.app.use(
                    config.swagger.path, 
                    swaggerUi.serve, 
                    swaggerUi.setup(require('../swagger/swagger.json'))
                    );
    }

    async start(){
        this.app.listen(this.port, (error) => {
            if(error){
                //console.log(err);
                logger.error(err);
                process.exit(1); 
                return
            } 
        });
    }
}

module.exports = ExpressServer;