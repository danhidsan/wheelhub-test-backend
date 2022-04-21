import 'reflect-metadata';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { QueryFailedError } from 'typeorm';
import { ValidationError } from 'class-validator';
import cors from 'cors';

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

app.use(cors());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post( '/create', async ( req: Request, res: Response ) => {
  try {
    await createUser(req.body);
    return res.send({ message: 'El usuario se creo correctamente' }).status(200);
  } catch(error) {
    if (error instanceof QueryFailedError)
      return res.send({ message: 'Payload incorrecto'}).status(400);
    else if (error instanceof ValidationError) res.send({ message: 'Payload incorrecto' }).status(400);
    else return res.send({ message: 'Ha ocurrido un error inesperado' }).status(500);
  }
} );

// start the Express server
app.listen( 8080, () => {
  console.log( `server started at http://localhost:${ 8080 }` );
} );