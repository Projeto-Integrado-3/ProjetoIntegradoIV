# Sistema de Agendamento de Consultas

![Status da CI](https://github.com/Projeto-Integrado-3/ProjetoIntegradoIV/actions/workflows/ci.yml/badge.svg)
![Node.js](https://img.shields.io/badge/node.js-20.x-green)
![ESLint](https://img.shields.io/badge/ESLint-passing-brightgreen)
![Jest](https://img.shields.io/badge/Tests-Jest-green)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey)](https://expressjs.com/)
[![Swagger](https://img.shields.io/badge/Swagger-API%20Docs-yellowgreen)](https://swagger.io/)
[![Docker](https://img.shields.io/badge/Docker-Containerization-blue)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)](https://www.postgresql.org/)

[//]: # (Sumário)
## Sumário

- [Descrição](#descrição)
- [O objetivo](#o-objetivo)
- [Equipe do Projeto](#equipe-do-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [EP1: Configuração da Integração Contínua (CI)](#ep1-configuração-da-integração-contínua-ci)
- [Componente Extensionista: O que é Integração Contínua (CI) e por que é importante?](#componente-extensionista-o-que-é-integração-contínua-ci-e-por-que-é-importante)
- [Qualidade de Código e Testes](#qualidade-de-código-e-testes)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
 [Como executar o frontend](#executando-o-frontend)
 [EP 2: Desenvolvimento da API RESTful](#ep2-desenvolvimento-da-api-restful)
 [Como executar o backend](#executando-backend)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)
- [Informações Adicionais](#informações-adicionais)
- [Telas do projeto](#telas-do-projeto)


## Descrição

Este projeto consiste em um sistema de agendamento de consultas, desenvolvido como parte da disciplina de Projeto Integrado IV do curso de Análise e Desenvolvimento de Sistemas.

## O objetivo

Criar uma plataforma eficiente e intuitiva para facilitar o agendamento de consultas, tanto para pacientes quanto para profissionais de saúde.

## Equipe do Projeto

- Valdeilson Bezerra de Lima - 2023010306

- Marcondes Alves Duarte - 2023010217

- Rayane Amaro dos Santos - 2023010280

---

---

## Estrutura do Projeto


```
ProjetoIntegradoIV/
├── 📁 .github/workflows/      # Configurações de CI/CD
│   └── ci.yml               # Pipeline de integração contínua
├── 📁 backend/               # API Backend (Node.js + Express + Prisma)
│   ├── 📁 prisma/           # Configurações do banco de dados
│   │   ├── 📁 migrations/   # Histórico de migrações do BD
│   │   └── schema.prisma    # Schema do banco de dados
│   ├── 📁 src/              # Código fonte do backend
│   │   ├── 📁 controllers/  # Controladores da API
│   │   │   └── 📁 paciente/ # Controllers de pacientes
│   │   ├── 📁 services/     # Lógica de negócio
│   │   │   └── 📁 pacientes/ # Services de pacientes
│   │   ├── 📁 prisma/       # Configuração do Prisma Client
│   │   ├── routes.js        # Definição das rotas da API
│   │   ├── server.js        # Servidor Express
│   │   └── swaggerConfig.js # Configuração da documentação
│   ├── .env.exemple         # Exemplo de variáveis de ambiente
│   ├── .gitignore           # Arquivos ignorados pelo Git
│   ├── package.json         # Dependências do backend
│   └── package-lock.json    # Lockfile do backend
├── 📁 frontend/              # Interface do usuário (HTML/CSS/JS)
│   ├── 📁 assets/           # Recursos estáticos (logo)
│   ├── 📁 pages/            # Páginas HTML do sistema
│   │   ├── 📁 dashboard/    # Painel administrativo
│   │   ├── 📁 pacientes/    # Gestão de pacientes
│   │   └── 📁 profissionalSaude/ # Gestão de profissionais
│   ├── 📁 scripts/          # Scripts JavaScript
│   │   └── 📁 __tests__/   # Testes unitários
│   ├── 📁 styles/           # Folhas de estilo CSS
│   ├── .prettierignore     # Ignora arquivos da formatação Prettier
│   ├── .prettierrc.json    # Regras de configuração do Prettier
│   ├── eslint.config.js    # Regras de configuração do ESLint
│   ├── index.css           # Estilização da página principal
│   ├── index.html          # Página inicial do projeto
│   ├── package.json        # Dependências do frontend
│   └── package-lock.json   # Lockfile do frontend
├── 📄 .gitignore             # Arquivos ignorados pelo Git (raiz)
├── 📄 LICENSE                # Licença do projeto
├── � package-lock.json      # Lockfile de dependências (raiz)
└── 📖 README.md              # Documentação principal do projeto
```


## EP1: Configuração da Integração Contínua (CI)

Esta seção detalha o cumprimento do **Entregável Parcial 1**.

**Objetivo do Processo de CI:**

O processo de Integração Contínua (CI) configurado neste repositório tem como objetivo principal automatizar a verificação da qualidade e da consistência do nosso código. Para isso, implementamos duas tarefas automatizadas:

1.  **Linting com Prettier:** Garante que todo o código (HTML, CSS, JavaScript) siga um padrão de formatação consistente.
2.  **Validação de HTML:** Verifica se os arquivos HTML do projeto possuem uma sintaxe válida.

**Configuração:**

Criamos um workflow utilizando **GitHub Actions**, definido no arquivo `.github/workflows/ci.yml`. Este workflow é acionado automaticamente sempre que um novo `push` ou `pull request` é feito para a branch `main`.

As principais etapas do nosso workflow são:

1.  **`actions/checkout@v4`**: Uma ação padrão que permite ao nosso workflow acessar o código-fonte do repositório.
2.  **Ação de Linting/Formatting**: Uma ação que executa o Prettier para verificar se todo o código está formatado corretamente de acordo com nossas regras.
3.  **Ação de Validação de HTML**: Uma ação que valida a sintaxe dos nossos arquivos HTML para garantir que não há erros estruturais.

Este processo executa as tarefas de verificação e nos notifica sobre o sucesso ou falha da análise, ajudando a manter a integridade do projeto.

## [Componente Extensionista] O que é Integração Contínua (CI) e por que é importante?

**Integração Contínua (CI)** é uma prática de desenvolvimento de software onde os desenvolvedores integram seu código novo a um repositório compartilhado várias vezes ao dia. Cada integração é então verificada por um processo automatizado que compila o código e executa testes.

**Analogia para Estudantes:**
Imagine que você está escrevendo um trabalho em grupo. Em vez de cada pessoa escrever uma parte isoladamente e depois tentar juntar tudo (o que geraria muitos conflitos), cada pessoa escreve pequenas seções e as integra frequentemente, verificando se o texto ainda faz sentido como um todo. A CI faz exatamente isso, mas com código.

**Por que isso é importante para quem está aprendendo a programar?**

Para estudantes e novos programadores, adotar a CI desde cedo traz vários benefícios:

- **Feedback Rápido:** Você descobre erros e problemas de compatibilidade quase que imediatamente, em vez de semanas depois. Isso torna a correção mais fácil e rápida.
- **Aprender Boas Práticas:** Ajuda a criar o hábito de escrever código mais limpo, testado e bem formatado, que são habilidades essenciais no mercado de trabalho.
- **Confiança para Mudar:** Com testes automatizados, você pode fazer alterações e refatorar seu código com mais segurança, sabendo que o sistema de CI vai alertar se algo quebrar.
- **Colaboração Melhorada:** Em projetos de equipe, a CI garante que o código de todos os membros funcione bem junto, evitando o famoso "na minha máquina funciona".

Em resumo, a CI automatiza a parte "chata" de verificar a qualidade do código, permitindo que você se concentre em aprender, criar novas funcionalidades e se tornar um desenvolvedor melhor.


## Qualidade de Código e Testes

### ESLint + Prettier

O projeto utiliza uma configuração moderna de qualidade de código:

- **Configuração:**
  - **ESLint v9** com configuração flat config (`eslint.config.js`)
  - **Prettier integrado** para evitar conflitos de formatação
  - **Suporte ES2021+** e ambiente browser/Node.js
  - **Variáveis globais** configuradas (SweetAlert2, Jest, DOM APIs)
- **Benefícios:**
  - Detecção automática de erros de sintaxe e lógica
  - Formatação consistente (aspas simples, semicolons, indentação)
  - Aplicação de boas práticas JavaScript
  - Feedback imediato durante desenvolvimento

### Sistema de Testes

O projeto implementa testes unitários com **Jest** e **Testing Library**:

- **Ambiente jsdom** para simulação de browser
- **Mocks configurados** para SweetAlert2 e localStorage
- **Cobertura de código** para funções críticas
- **Testes de validação** para formulários e autenticação

## Funcionalidades Principais

- Agendamento de consultas online.
- Visualização da disponibilidade de médicos.
- Confirmação e cancelamento de consultas.
- Cadastro de pacientes e profissionais de saúde.
- Interface intuitiva e fácil de usar.
- Controle de login e logout com autenticação.
- Histórico de consultas e agendamentos.
- Modal para cadastro e edição de informações.
- Responsividade para dispositivos móveis.

## Tecnologias Utilizadas

### Frontend

- **HTML5**: Estrutura semântica das páginas
- **CSS3**: Estilização moderna com variáveis CSS
- **JavaScript ES6+**: Lógica de interface e interações
- **SweetAlert2**: Sistema de alertas modernos

### Ferramentas de Desenvolvimento

- **Node.js 20**: Runtime JavaScript
- **ESLint 9**: Análise estática de código
- **Prettier**: Formatação automática de código
- **Jest**: Framework de testes unitários
- **GitHub Actions**: Integração e entrega contínua (CI/CD)
- **Live Server**: Servidor local para desenvolvimento
- **Visual Studio Code**: Editor de código com suporte a extensões

## Executando o Frontend

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/Projeto-Integrado-3/ProjetoIntegradoIV.git]
    ```
2.  Abra o projeto em seu editor de código ou IDE preferido (ex.: Visual Studio Code).
3.  Configure o Live Server para visualizar o projeto localmente:
    - Certifique-se de que a extensão Live Server está instalada no Visual Studio Code.
    - Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".


## EP2: Desenvolvimento da API RESTful


### API de Gestão de Pacientes
Esta é uma API RESTful para gerenciar registros de pacientes, permitindo operações de criação, leitura, atualização e exclusão (CRUD).

#### Executando Backend
Siga os passos abaixo para configurar e executar a API em seu ambiente de desenvolvimento.

**Pré-requisitos**
- Node.js (versão 20.x ou superior)
- NPM (geralmente instalado com o Node.js)
- Git
- Um banco de dados PostgreSQL em execução.

**Passos para Instalação**
1. Clone o repositório:
   ```bash
   git clone https://github.com/Projeto-Integrado-3/ProjetoIntegradoIV.git
   ```
2. Navegue até o diretório do backend:
   ```bash
   cd ProjetoIntegradoIV/backend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env`.
   - Abra o arquivo `.env` e insira a URL de conexão do seu banco de dados PostgreSQL. Exemplo:
     ```env
     DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
     ```
5. Aplique as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```
6. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
O servidor estará em execução em `http://localhost:3333`.

#### Documentação da API (Swagger)
A documentação completa da API, incluindo todos os endpoints, parâmetros e schemas, está disponível via Swagger UI.

- **URL da Documentação:** [http://localhost:3333/api-docs](http://localhost:3333/api-docs)

Acesse este link em seu navegador enquanto o servidor estiver em execução para explorar e interagir com a API.

#### Testando a API
Você pode usar ferramentas como Postman, Insomnia ou `curl` para testar os endpoints.

##### Exemplos de Requisições
1. **Criar um novo paciente**
   - Endpoint: `POST /pacientes`
   - Headers: `Content-Type: application/json`
   - Body (Exemplo):
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
   - Resposta (201 Created):
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
2. **Listar todos os pacientes**
   - Endpoint: `GET /pacientes/list`
   - Resposta (200 OK):
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

#### Possíveis Usos da Nossa API (Componente Extensionista)
Esta API é mais do que um conjunto de endpoints; é uma ferramenta fundamental projetada para resolver problemas reais no ecossistema de saúde, com um forte potencial para impacto social e inovação. Abaixo, detalhamos como diferentes atores podem se beneficiar desta solução.

1. **Modernização de Pequenas Clínicas e Consultórios Locais**
   - O Problema: Muitas clínicas em comunidades locais ainda dependem de arquivos em papel ou planilhas desorganizadas. Esse método é ineficiente, propenso a erros de legibilidade, perda de dados e dificulta o acesso rápido ao histórico do paciente durante uma emergência.
   - Nossa Solução como Ferramenta de Impacto: A API oferece a espinha dorsal para um sistema de prontuário eletrônico simples e de baixo custo. Uma interface (frontend) pode ser desenvolvida por estudantes ou voluntários da comunidade para interagir com a API, permitindo que médicos e recepcionistas:
     - Digitalizem o cadastro de pacientes de forma segura e padronizada.
     - Acessem históricos médicos completos em segundos.
     - Reduzam o tempo gasto em tarefas administrativas, dedicando mais atenção ao cuidado do paciente.
   - Impacto Extensionista: Ao capacitar pequenas clínicas, o projeto melhora diretamente a qualidade do atendimento de saúde na comunidade, diminui riscos associados a informações incorretas e serve como um estudo de caso sobre os benefícios da transformação digital na saúde local.

2. **Acelerador para Inovação e Empreendedorismo em Saúde (Health Tech)**
   - O Desafio: Para startups e desenvolvedores independentes, criar uma infraestrutura de backend segura e em conformidade com as regulações de dados de saúde é uma barreira significativa, que consome tempo e recursos preciosos.
   - Nossa Solução como Plataforma: A API funciona como um "Backend-as-a-Service" (BaaS) para a gestão de pacientes. Em vez de construir essa base do zero, inovadores podem consumir nossa API e focar no que realmente agrega valor: a experiência do usuário e a criação de soluções inovadoras.
   - Impacto Extensionista: O projeto se torna um catalisador para o ecossistema de inovação local. Ele pode ser usado em hackathons, disciplinas de empreendedorismo ou por startups em incubadoras para:
     - Desenvolver aplicativos de telemedicina.
     - Criar plataformas para agendamento online de consultas e exames.
     - Construir soluções de monitoramento de pacientes crônicos, onde os dados são enviados para a API e acompanhados por profissionais de saúde.

3. **Ferramenta para Projetos de Saúde Pública e Comunitária**
   - O Cenário: Agentes comunitários de saúde e ONGs realizam um trabalho vital, como campanhas de vacinação, acompanhamento de gestantes e monitoramento de endemias. Frequentemente, a coleta de dados é feita em papel, dificultando a análise e a gestão em larga escala.
   - Nossa Solução em Campo: A API pode ser o backend de um aplicativo móvel simples, que funcione até mesmo offline e sincronize os dados quando houver conexão. Com isso, agentes de saúde podem:
     - Registrar visitas e informações de saúde diretamente no celular ou tablet.
     - Identificar famílias que precisam de acompanhamento.
     - Gerar dados georreferenciados para mapas de calor de incidência de doenças.
   - Impacto Extensionista: Fortalece as ações de saúde pública, permitindo que gestores tomem decisões baseadas em dados atualizados e precisos. Melhora a eficiência das campanhas, otimiza a alocação de recursos e cria um registro histórico valioso para estudos epidemiológicos futuros na comunidade.

### Criar paciente (POST /pacientes)
```bash
curl -X POST http://localhost:3333/pacientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Silva",
    "cpf": "12345678900",
    "idade": 28,
    "email": "maria@exemplo.com",
    "telefone": "11999999999",
    "endereco": "Rua das Flores, 100"
  }'
```
**Resposta:**
```json
{
  "id": "ckxyz...",
  "nome": "Maria Silva",
  "cpf": "12345678900",
  "idade": 28,
  "email": "maria@exemplo.com",
  "telefone": "11999999999",
  "endereco": "Rua das Flores, 100",
  "createdAt": "2025-08-18T23:00:00.000Z",
  "updatedAt": "2025-08-18T23:00:00.000Z"
}
```

### Atualizar paciente (PUT /pacientes/:id)
```bash
curl -X PUT http://localhost:3333/pacientes/ckxyz... \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Silva",
    "cpf": "12345678900",
    "idade": 29,
    "email": "maria@exemplo.com",
    "telefone": "11999999999",
    "endereco": "Rua das Flores, 100"
  }'
```
**Resposta:**
```json
{
  "id": "ckxyz...",
  "nome": "Maria Silva",
  "cpf": "12345678900",
  "idade": 29,
  "email": "maria@exemplo.com",
  "telefone": "11999999999",
  "endereco": "Rua das Flores, 100",
  "createdAt": "2025-08-18T23:00:00.000Z",
  "updatedAt": "2025-08-18T23:10:00.000Z"
}
```

### Listar pacientes (GET /pacientes/list)
```bash
curl http://localhost:3333/pacientes/list
```
**Resposta:**
```json
[
  {
    "id": "ckxyz...",
    "nome": "Maria Silva",
    "cpf": "12345678900",
    "idade": 29,
    "email": "maria@exemplo.com",
    "telefone": "11999999999",
    "endereco": "Rua das Flores, 100",
    "createdAt": "2025-08-18T23:00:00.000Z",
    "updatedAt": "2025-08-18T23:10:00.000Z"
  }
]
```

### Deletar paciente (DELETE /pacientes/:id)
```bash
curl -X DELETE http://localhost:3333/pacientes/ckxyz...
```
**Resposta:**
Status 204 (No Content)
---

## Possíveis usos da nossa API

Esta API pode ser utilizada por clínicas, consultórios médicos, hospitais ou até mesmo profissionais autônomos para gerenciar o cadastro de pacientes, agendar consultas, manter o histórico de atendimentos e facilitar a comunicação com os pacientes.

**Exemplo de uso real:**

- Uma clínica pode integrar esta API ao seu sistema de gestão para automatizar o cadastro de novos pacientes, atualizar informações e consultar rapidamente o histórico de atendimentos.
- Profissionais autônomos podem usar a API para organizar seus agendamentos e manter os dados dos pacientes sempre atualizados, melhorando o atendimento e a experiência do paciente.

Ao conectar o projeto a problemas reais, incentivamos o uso da tecnologia para tornar processos de saúde mais eficientes, acessíveis e organizados.

## Uso

1.  Acesse a interface do sistema através do navegador.
2.  Cadastre-se como usuário.
3.  Realize login com email e senha cadastrada para acessar o painel de controle.
4.  Agende, visualize ou cancele consultas conforme necessário.
5.  Utilize as funcionalidades de cadastro e edição de pacientes e profissionais de saúde.

## Contribuição

Contribuições são bem-vindas! Siga estas diretrizes:

1.  Faça um fork do repositório.
2.  Crie uma branch para sua funcionalidade: `git checkout -b minha-funcionalidade`.
3.  Faça commit das suas alterações: `git commit -am 'Adiciona nova funcionalidade'`.
4.  Faça push para a branch: `git push origin minha-funcionalidade`.
5.  Crie um pull request.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo MIT License para mais detalhes.

## Contato

- Equipe do projeto - [equipe12ads@gmail.com]

## Informações Adicionais

- Este projeto foi desenvolvido como parte de um trabalho acadêmico.
- Para mais informações, consulte a documentação do código ou entre em contato.

## Telas do projeto

- Pagina Inicial

![Captura de tela de 2025-05-01 17-31-19](https://github.com/user-attachments/assets/f0aaff72-8f2e-4c24-a17c-5fc4c25d027d)

- Tela de Login

![Captura de tela de 2025-05-01 17-31-27](https://github.com/user-attachments/assets/316a2047-1ce5-41a5-b234-229e502a1aaf)

- Tela de Cadastro de Usuário

![Captura de tela de 2025-05-01 17-31-32](https://github.com/user-attachments/assets/17b535f3-4d6d-44e0-af39-bddd6f41975c)

- Tela Home

![Captura de tela de 2025-05-01 17-32-33](https://github.com/user-attachments/assets/1fc040de-652f-4561-bc6d-4283ff7c68dc)

- Tela de Consultas Médica

![Captura de tela de 2025-05-01 17-32-42](https://github.com/user-attachments/assets/08cb0758-fb31-436e-b569-debf452edee2)

- Tela de agendamentos

![Captura de tela de 2025-05-01 17-59-16](https://github.com/user-attachments/assets/2169d31a-7588-4f6d-9bbf-54f568ab0f33)

- Tela do formulário onde agenda uma consulta

![Captura de tela de 2025-05-01 17-32-54](https://github.com/user-attachments/assets/10cfb9d2-b408-46e7-8e98-7cb513dbc19f)

- Tela de Histórico de Consultas

![Captura de tela de 2025-05-01 17-58-30](https://github.com/user-attachments/assets/e15db59b-bc3f-40d6-b8b0-bcdc927b4c5f)

- Tela de Cadastramento de Paciente

![Captura de tela de 2025-05-01 17-33-00](https://github.com/user-attachments/assets/f570022e-985b-48ad-acc2-08d3fadf52a1)

- Formulário de Cadastramento de Paciente

![Captura de tela de 2025-05-01 17-55-13](https://github.com/user-attachments/assets/3978877b-d2d5-4f7d-bbe8-1980067e24a7)

- Tela de Cadastramento de Profissional

![Captura de tela de 2025-05-01 17-33-03](https://github.com/user-attachments/assets/0495598e-b16d-490d-9202-e6d60be0caab)

- Formulário de Cadastramento de Profissional

![Captura de tela de 2025-05-01 17-55-33](https://github.com/user-attachments/assets/357cdeee-6604-4ed2-9b3e-c083cc0ae373)

- Tela de Gerenciamento de Exames

![Captura de tela de 2025-05-01 17-33-06](https://github.com/user-attachments/assets/11628846-d319-41aa-8181-08e9ecfbb3e8)
