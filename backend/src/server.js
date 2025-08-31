import express  from 'express';
import router from './routes.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  if ( err instanceof Error) {
    return res.status(500).json({ error: err.message });
  }
  return res.status(500).json({ error: 'Internal Server Error' });
  
});

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});