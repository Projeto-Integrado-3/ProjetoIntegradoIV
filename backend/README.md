# Backend - Sistema de Agendamento

Este é o backend do projeto, responsável por gerenciar os dados de pacientes, agendamentos e outras entidades do sistema.

## Tecnologias Utilizadas

*   **Node.js**: Ambiente de execução do JavaScript no servidor.
*   **Express**: Framework para construção de APIs REST.
*   **Prisma**: ORM para interação com o banco de dados.
*   **PostgreSQL**: Banco de dados relacional, com hospedagem na **[Neon](https://neon.tech/)**.
*   **Swagger**: Ferramenta para documentação e teste interativo da API.
*   **Nodemon**: Ferramenta para reiniciar o servidor automaticamente durante o desenvolvimento.
*   **CORS**: Middleware para habilitar o Cross-Origin Resource Sharing.

## Como Começar

Siga as instruções abaixo para executar o projeto em seu ambiente de desenvolvimento.

### 1. Pré-requisitos

*   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)

### 2. Instalação e Configuração

1.  Navegue até o diretório do backend e instale as dependências:
    ```bash
    cd backend
    npm install
    ```

2.  **Configure o Banco de Dados (Neon)**:
    *   Este projeto é configurado para usar PostgreSQL hospedado na plataforma **Neon**.
    *   Renomeie o arquivo `.env.exemple` para `.env`.
    *   Obtenha a **connection string** do seu banco de dados no painel da Neon.
    *   Cole a connection string no arquivo `.env`, no seguinte formato:
        ```
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
        ```

3.  **Execute as Migrations**:
    Com o banco de dados configurado, aplique o schema da aplicação:
    ```bash
    npx prisma migrate dev
    ```

### 3. Executando a Aplicação

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333` (ou a porta definida no seu ambiente).

## Documentação da API (Swagger)

A documentação completa e interativa da API foi gerada com o Swagger.

Com o servidor em execução, acesse a seguinte URL no seu navegador para visualizar e testar todos os endpoints:

[http://localhost:3333/api-docs](http://localhost:3333/api-docs)

## Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── .env.exemple
│   ├── routes.js
│   └── server.js
├── .gitignore
├── package.json
└── README.md
```