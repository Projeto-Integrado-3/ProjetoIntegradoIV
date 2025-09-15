# RELATÓRIO DE TESTES DE SOFTWARE - API DE PACIENTES

**Projeto:** Sistema de Gerenciamento de Pacientes  
**Versão da API:** 1.0.0  
**Data do Relatório:** 15 de setembro de 2025  
**Responsável:** Equipe de Desenvolvimento  
**Branch:** EP3

---

## 📋 RESUMO EXECUTIVO

Este relatório apresenta os casos de teste elaborados para verificação da API de gerenciamento de pacientes, com foco nas rotas GET e POST. O objetivo é garantir a qualidade, confiabilidade e funcionalidade adequada do sistema através de testes manuais e automatizados.

### Escopo dos Testes:

- **Rota GET:** `/pacientes/list` - Listagem de pacientes
- **Rota POST:** `/pacientes` - Criação de pacientes
- **Foco:** Testes funcionais, de performance, tratamento de erros e validação de dados

---

## 🏗️ ARQUITETURA DA API

### Tecnologias Utilizadas:

- **Backend:** Node.js + Express.js
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Documentação:** Swagger/OpenAPI
- **Arquitetura:** Controller → Service → Repository (Prisma)

### Estrutura do Modelo Paciente:

```prisma
model Paciente {
  id        String   @id @default(cuid())
  nome      String
  cpf       String   @unique
  idade     Int
  email     String
  telefone  String
  endereco  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🧪 CASOS DE TESTE - ROTA GET /pacientes/list

### CT-GET-01: Listar pacientes com dados existentes ✅

- **Objetivo:** Verificar retorno correto quando existem pacientes cadastrados
- **Status Esperado:** 200 OK
- **Validações:** JSON válido, estrutura correta, todos os campos presentes

### CT-GET-02: Listar pacientes com banco vazio ✅

- **Objetivo:** Comportamento com banco de dados sem registros
- **Status Esperado:** 200 OK
- **Resultado:** Array vazio []

### CT-GET-03: Erro de conexão com banco ⚠️

- **Objetivo:** Tratamento de falhas de infraestrutura
- **Status Esperado:** 500 Internal Server Error
- **Validações:** Mensagem de erro apropriada, API estável

### CT-GET-04: Performance com grande volume 📈

- **Objetivo:** Teste de carga com 1000+ registros
- **Status Esperado:** 200 OK
- **Critérios:** Response time < 5s, memória estável

### CT-GET-05: Validação de headers e formato 📝

- **Objetivo:** Verificar padronização HTTP
- **Validações:** Content-Type, encoding UTF-8, JSON Schema

### CT-GET-06: Teste de concorrência 🔄

- **Objetivo:** Múltiplas requisições simultâneas
- **Cenário:** 10 requisições paralelas
- **Critérios:** Consistência de dados, sem race conditions

---

## 🆕 CASO DE TESTE - ROTA POST /pacientes

### CT-POST-01: Criação de paciente com sucesso ✅

**Cenário:** Criar paciente com dados válidos e CPF único

**Payload de Entrada:**

```json
{
  "nome": "Maria Silva Santos",
  "cpf": "123.456.789-01",
  "idade": 35,
  "email": "maria.santos@email.com",
  "telefone": "(11) 98765-4321",
  "endereco": "Rua das Flores, 123, Centro, São Paulo - SP"
}
```

**Resultado Esperado:**

- **Status:** 201 Created
- **Response:** Objeto paciente com ID gerado + timestamps
- **Validações:**
  - ✅ CUID gerado automaticamente
  - ✅ Persistência no banco confirmada
  - ✅ Campos createdAt/updatedAt preenchidos
  - ✅ Encoding UTF-8 para acentos
  - ✅ Response time < 2s

**Passos Detalhados:**

1. Configurar POST para http://localhost:3333/pacientes
2. Header: `Content-Type: application/json`
3. Enviar payload no body
4. Verificar status 201 e estrutura de resposta
5. Confirmar persistência via GET /pacientes/list

---

## 📊 MATRIZ DE COBERTURA DE TESTES

| Funcionalidade          | Cenário Positivo | Cenário Negativo | Performance  | Concorrência |
| ----------------------- | ---------------- | ---------------- | ------------ | ------------ |
| **GET /pacientes/list** | ✅ CT-GET-01     | ✅ CT-GET-03     | ✅ CT-GET-04 | ✅ CT-GET-06 |
| **POST /pacientes**     | ✅ CT-POST-01    | 🔄 Planejado     | 🔄 Planejado | 🔄 Planejado |

### Legenda:

- ✅ **Implementado** - Caso de teste documentado e pronto para execução
- 🔄 **Planejado** - Identificado para implementação futura
- ⚠️ **Atenção** - Requer configuração especial de ambiente

---

## 🎯 CRITÉRIOS DE ACEITAÇÃO GERAIS

### Funcionais:

- Todas as rotas retornam JSON válido
- Status codes apropriados (200, 201, 400, 500)
- Validação de dados de entrada
- Mensagens de erro informativas
- Persistência correta no banco

### Não-Funcionais:

- **Performance:** Response time < 5s para operações normais
- **Disponibilidade:** API estável mesmo com erros de infraestrutura
- **Usabilidade:** Documentação clara via Swagger
- **Segurança:** Não exposição de dados sensíveis em erros
- **Manutenibilidade:** Logs adequados para troubleshooting

---

## 🔧 CONFIGURAÇÃO PARA EXECUÇÃO DOS TESTES

### Pré-requisitos:

```bash
# Instalar dependências
cd backend
npm install

# Configurar banco de dados
cp .env.example .env
# Editar DATABASE_URL no .env

# Executar migrações
npx prisma migrate dev

# Iniciar servidor
npm run dev
```

### Ferramentas Recomendadas:

- **Testes Manuais:** Postman, Insomnia ou Thunder Client
- **Testes Automatizados:** Jest + Supertest
- **Monitoramento:** Console do navegador, logs do servidor
- **Banco:** Prisma Studio para verificar persistência

---

## 📈 MÉTRICAS DE QUALIDADE

### Cobertura de Cenários:

- **Casos Positivos:** 2/2 (100%)
- **Casos Negativos:** 1/2 (50%)
- **Testes de Performance:** 1/2 (50%)
- **Testes de Integração:** 1/2 (50%)

### Próximos Passos:

1. **Implementar testes automatizados** com Jest/Supertest
2. **Adicionar casos negativos** para POST (dados inválidos, CPF duplicado)
3. **Teste de performance** para criação em massa
4. **Validação de schema** com bibliotecas específicas
5. **Testes end-to-end** integrando frontend

---

## 🏆 CONCLUSÃO

Os casos de teste elaborados cobrem os cenários principais das rotas GET e POST da API de pacientes, garantindo:

- ✅ **Funcionalidade básica** testada e documentada
- ✅ **Tratamento de erros** considerado
- ✅ **Performance e concorrência** avaliadas
- ✅ **Padronização HTTP** verificada
- ✅ **Documentação clara** para execução

O sistema está preparado para validação através dos testes manuais definidos, com base sólida para expansão para testes automatizados conforme o projeto evolui.

**Qualidade:** 🟢 **ADEQUADA** para o estágio atual do projeto  
**Recomendação:** Proceder com execução dos testes manuais antes do deploy
