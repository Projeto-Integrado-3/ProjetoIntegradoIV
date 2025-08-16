# Backend

Este é o backend do projeto, responsável por gerenciar os dados dos pacientes.

## Tecnologias Utilizadas

*   **Node.js**: Ambiente de execução do JavaScript no servidor.
*   **Express**: Framework para construção de APIs REST.
*   **Prisma**: ORM para interação com o banco de dados.
*   **PostgreSQL**: Banco de dados relacional.
*   **Nodemon**: Ferramenta para reiniciar o servidor automaticamente durante o desenvolvimento.
*   **CORS**: Middleware para habilitar o Cross-Origin Resource Sharing.

## Como Começar

Siga as instruções abaixo para executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

*   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
*   [PostgreSQL](https://www.postgresql.org/download/)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone <url-do-repositorio>
    ```
2.  Navegue até o diretório do backend:
    ```bash
    cd backend
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Configure as variáveis de ambiente. Renomeie o arquivo `.env.example` para `.env` e preencha com as informações do seu banco de dados:
    ```
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```
5.  Execute as migrações do banco de dados:
    ```bash
    npx prisma migrate dev
    ```
6.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

O servidor estará disponível em `http://localhost:3000`.

## Endpoints da API

### Pacientes

*   **GET /pacientes/list**: Lista todos os pacientes.
*   **POST /pacientes**: Cria um novo paciente.

    **Corpo da Requisição:**
    ```json
    {
      "nome": "string",
      "cpf": "string",
      "idade": "integer",
      "email": "string",
      "telefone": "string",
      "endereco": "string"
    }
    ```
*   **PUT /pacientes/:id**: Atualiza um paciente existente.

    **Corpo da Requisição:**
    ```json
    {
      "nome": "string",
      "cpf": "string",
      "idade": "integer",
      "email": "string",
      "telefone": "string",
      "endereco": "string"
    }
    ```
*   **DELETE /pacientes/:id**: Deleta um paciente existente.

## Estrutura do Projeto

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── controllers/
│   │   └── paciente/
│   ├── services/
│   │   └── pacientes/
│   ├── .env.example
│   ├── routes.js
│   └── server.js
├── .gitignore
├── package.json
└── README.md
```

## Modelo do Banco de Dados

O schema do banco de dados é definido no arquivo `prisma/schema.prisma`.

### Modelo `Paciente`

| Campo     | Tipo     | Descrição                  |
| :-------- | :------- | :------------------------- |
| `id`      | `String` | ID único do paciente (CUID) |
| `nome`    | `String` | Nome do paciente           |
| `cpf`     | `String` | CPF do paciente (único)    |
| `idade`   | `Int`    | Idade do paciente          |
| `email`   | `String` | Email do paciente          |
| `telefone`| `String` | Telefone do paciente       |
| `endereco`| `String` | Endereço do paciente       |
