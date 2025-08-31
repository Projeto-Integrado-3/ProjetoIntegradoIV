import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Pacientes',
      version: '1.0.0',
      description: 'Documentação da API para gerenciamento de pacientes',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },
  apis: ['./src/routes.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
