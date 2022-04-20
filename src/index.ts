import 'reflect-metadata';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { QueryFailedError } from 'typeorm';
import { ValidationError } from 'class-validator';

import { sqliteDataSource } from './db';
import { createUser } from './services/user';

// establish database connection
sqliteDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'WheelHub test backend',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express',
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./*.ts'],
};
  
const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post( '/create', async ( req: Request, res: Response ) => {
  try {
    await createUser(req.body);
    return res.send({ status: 200, message: 'El usuario se creo correctamente' });
  } catch(error) {
    if (error instanceof QueryFailedError)
      return res.send({ status: 400, message: 'Payload incorrecto'});
    else if (error instanceof ValidationError) res.send({ status: 400, message: 'Payload incorrecto' });
    else return res.send({ status: 500, message: 'Ha ocurrido un error inesperado' });
  }
} );

// start the Express server
app.listen( 8080, () => {
  console.log( `server started at http://localhost:${ 8080 }` );
} );