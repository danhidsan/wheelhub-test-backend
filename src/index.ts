import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( '/', ( req: any, res: any ) => {
  res.send( 'Hello world!' );
} );

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
} );