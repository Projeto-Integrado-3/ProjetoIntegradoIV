# API de Gestão de Pacientes

Esta é uma API RESTful para gerenciar registros de pacientes, permitindo operações de criação, leitura, atualização e exclusão (CRUD).

## Executando Localmente

Siga os passos abaixo para configurar e executar a API em seu ambiente de desenvolvimento.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20.x ou superior)
- [NPM](https://www.npmjs.com/) (geralmente instalado com o Node.js)
- [Git](https://git-scm.com/)
- Um banco de dados PostgreSQL em execução.

### Passos para Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2.  **Navegue até o diretório do backend:**
    ```bash
    cd seu-repositorio/backend
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    - Renomeie o arquivo `.env.example` para `.env`.
    - Abra o arquivo `.env` e insira a URL de conexão do seu banco de dados PostgreSQL. Exemplo:
      ```
      DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
      ```

5.  **Aplique as migrações do banco de dados:**
    Este comando irá criar as tabelas necessárias no seu banco de dados com base no schema do Prisma.
    ```bash
    npx prisma migrate dev
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

O servidor estará em execução em `http://localhost:3333`.

---

## Documentação da API (Swagger)

A documentação completa da API, incluindo todos os endpoints, parâmetros e schemas, está disponível via Swagger UI.

- **URL da Documentação:** [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

Acesse este link em seu navegador enquanto o servidor estiver em execução para explorar e interagir com a API.

---

## Testando a API

Você pode usar ferramentas como [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) ou `curl` para testar os endpoints.

### Exemplos de Requisições

#### 1. Criar um novo paciente

- **Endpoint:** `POST /pacientes`
- **Headers:** `Content-Type: application/json`
- **Body (Exemplo):**
  ```json
  {
    "nome": "Maria Oliveira",
    "cpf": "987.654.321-01",
    "idade": 35,
    "email": "maria.oliveira@example.com",
    "telefone": "(21) 91234-5678",
    "endereco": "Avenida Principal, 456"
  }
  ```

- **Resposta (201 Created):**
  ```json
  {
    "id": "clxyz...",
    "nome": "Maria Oliveira",
    "cpf": "987.654.321-01",
    "idade": 35,
    "email": "maria.oliveira@example.com",
    "telefone": "(21) 91234-5678",
    "endereco": "Avenida Principal, 456",
    "createdAt": "2025-08-31T10:00:00.000Z",
    "updatedAt": "2025-08-31T10:00:00.000Z"
  }
  ```

#### 2. Listar todos os pacientes

- **Endpoint:** `GET /pacientes/list`

- **Resposta (200 OK):**
  ```json
  [
    {
      "id": "clxyz...",
      "nome": "Maria Oliveira",
      "cpf": "987.654.321-01",
      "idade": 35,
      "email": "maria.oliveira@example.com",
      "telefone": "(21) 91234-5678",
      "endereco": "Avenida Principal, 456",
      "createdAt": "2025-08-31T10:00:00.000Z",
      "updatedAt": "2025-08-31T10:00:00.000Z"
    }
  ]
  ```

---

## Possíveis Usos da Nossa API (Componente Extensionista)

Esta API é mais do que um conjunto de endpoints; é uma ferramenta fundamental projetada para resolver problemas reais no ecossistema de saúde, com um forte potencial para impacto social e inovação. Abaixo, detalhamos como diferentes atores podem se beneficiar desta solução.

### 1. Modernização de Pequenas Clínicas e Consultórios Locais

-   **O Problema:** Muitas clínicas em comunidades locais ainda dependem de arquivos em papel ou planilhas desorganizadas. Esse método é ineficiente, propenso a erros de legibilidade, perda de dados e dificulta o acesso rápido ao histórico do paciente durante uma emergência.
-   **Nossa Solução como Ferramenta de Impacto:** A API oferece a espinha dorsal para um sistema de prontuário eletrônico simples e de baixo custo. Uma interface (frontend) pode ser desenvolvida por estudantes ou voluntários da comunidade para interagir com a API, permitindo que médicos e recepcionistas:
    -   Digitalizem o cadastro de pacientes de forma segura e padronizada.
    -   Acessem históricos médicos completos em segundos.
    -   Reduzam o tempo gasto em tarefas administrativas, dedicando mais atenção ao cuidado do paciente.
-   **Impacto Extensionista:** Ao capacitar pequenas clínicas, o projeto melhora diretamente a qualidade do atendimento de saúde na comunidade, diminui riscos associados a informações incorretas e serve como um estudo de caso sobre os benefícios da transformação digital na saúde local.

### 2. Acelerador para Inovação e Empreendedorismo em Saúde (Health Tech)

-   **O Desafio:** Para startups e desenvolvedores independentes, criar uma infraestrutura de backend segura e em conformidade com as regulações de dados de saúde é uma barreira significativa, que consome tempo e recursos preciosos.
-   **Nossa Solução como Plataforma:** A API funciona como um "Backend-as-a-Service" (BaaS) para a gestão de pacientes. Em vez de construir essa base do zero, inovadores podem consumir nossa API e focar no que realmente agrega valor: a experiência do usuário e a criação de soluções inovadoras.
-   **Impacto Extensionista:** O projeto se torna um catalisador para o ecossistema de inovação local. Ele pode ser usado em hackathons, disciplinas de empreendedorismo ou por startups em incubadoras para:
    -   Desenvolver aplicativos de telemedicina.
    -   Criar plataformas para agendamento online de consultas e exames.
    -   Construir soluções de monitoramento de pacientes crônicos, onde os dados são enviados para a API e acompanhados por profissionais de saúde.

### 3. Ferramenta para Projetos de Saúde Pública e Comunitária

-   **O Cenário:** Agentes comunitários de saúde e ONGs realizam um trabalho vital, como campanhas de vacinação, acompanhamento de gestantes e monitoramento de endemias. Frequentemente, a coleta de dados é feita em papel, dificultando a análise e a gestão em larga escala.
-   **Nossa Solução em Campo:** A API pode ser o backend de um aplicativo móvel simples, que funcione até mesmo offline e sincronize os dados quando houver conexão. Com isso, agentes de saúde podem:
    -   Registrar visitas e informações de saúde diretamente no celular ou tablet.
    -   Identificar famílias que precisam de acompanhamento.
    -   Gerar dados georreferenciados para mapas de calor de incidência de doenças.
-   **Impacto Extensionista:** Fortalece as ações de saúde pública, permitindo que gestores tomem decisões baseadas em dados atualizados e precisos. Melhora a eficiência das campanhas, otimiza a alocação de recursos e cria um registro histórico valioso para estudos epidemiológicos futuros na comunidade.

