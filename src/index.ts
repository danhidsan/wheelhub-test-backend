import * as reflect from 'reflect-metadata';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { sqliteDataSource } from './db';
import { User } from './entity/User';

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
const port = 8080; // default port to listen

// define a route handler for the default home page
app.post( '/create', async ( req: Request, res: Response ) => {
  const user = await sqliteDataSource.getRepository(User).create(req.body);
  const results = await sqliteDataSource.getRepository(User).save(user);
  return res.send(results);
} );

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );