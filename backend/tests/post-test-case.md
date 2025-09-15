# Caso de Teste - Rota POST /pacientes (Criação de Paciente)

## Informações da Rota

- **Método:** POST
- **URL:** /pacientes
- **Funcionalidade:** Criar um novo paciente no sistema
- **Controller:** CreatePacienteController
- **Service:** CreatePacienteService
- **Validações:** CPF único, todos os campos obrigatórios

---

## CASO DE TESTE: Criação de paciente com dados válidos

### CT-POST-01: Criar paciente com sucesso

**Cenário:** Criar um novo paciente com todos os dados válidos e CPF único  
**Pré-condições:**

- API rodando normalmente
- Banco de dados disponível
- CPF informado não existe na base de dados

**Entrada:**

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

**Passos:**

1. Abrir ferramenta de teste de API (Postman, Insomnia, etc.)
2. Configurar método POST para a URL: http://localhost:3333/pacientes
3. Adicionar header: `Content-Type: application/json`
4. Inserir o JSON de entrada no body da requisição
5. Enviar a requisição
6. Analisar a resposta recebida
7. Verificar se o paciente foi salvo no banco de dados

**Resultado Esperado:**

- **Status Code:** 201 Created
- **Content-Type:** application/json
- **Body:** Objeto JSON do paciente criado contendo:
  ```json
  {
    "id": "cuid_gerado_automaticamente",
    "nome": "Maria Silva Santos",
    "cpf": "123.456.789-01",
    "idade": 35,
    "email": "maria.santos@email.com",
    "telefone": "(11) 98765-4321",
    "endereco": "Rua das Flores, 123, Centro, São Paulo - SP",
    "createdAt": "2025-09-15T10:30:00.000Z",
    "updatedAt": "2025-09-15T10:30:00.000Z"
  }
  ```

**Critérios de Aceitação:**

- ✅ Resposta retorna status 201 Created
- ✅ ID é gerado automaticamente (CUID)
- ✅ Todos os campos enviados são retornados corretamente
- ✅ Campos createdAt e updatedAt são preenchidos automaticamente
- ✅ Data está no formato ISO 8601
- ✅ Paciente é persistido no banco de dados
- ✅ Consulta posterior GET /pacientes/list inclui o novo paciente
- ✅ Response time adequado (< 2s)

**Validações Adicionais:**

- **Formato JSON válido:** Resposta deve ser um JSON bem formado
- **Persistência:** Verificar no banco se o registro foi salvo
- **Unicidade do CPF:** Confirmar que o CPF não pode ser reutilizado
- **Encoding:** Caracteres especiais (acentos) preservados corretamente

---

## Variações do Caso de Teste

### Dados de Teste Alternativos:

```json
{
  "nome": "João Carlos da Silva",
  "cpf": "987.654.321-00",
  "idade": 42,
  "email": "joao.silva@empresa.com.br",
  "telefone": "(21) 91234-5678",
  "endereco": "Av. Paulista, 1000, Apto 501, Bela Vista, São Paulo - SP"
}
```

### Verificação de Persistência:

Após criar o paciente, executar GET /pacientes/list e confirmar que:

- O novo paciente aparece na lista
- Todos os dados estão corretos
- O ID gerado é único
- As timestamps estão corretas

### Teste de Integração:

1. Criar paciente via POST
2. Buscar paciente criado via GET /pacientes/list
3. Tentar criar outro paciente com mesmo CPF (deve falhar)
4. Atualizar paciente via PUT (se implementado)
5. Deletar paciente via DELETE (se implementado)

**Tempo Estimado de Execução:** 3-5 minutos  
**Prioridade:** Alta (funcionalidade core)  
**Categoria:** Teste Funcional Positivo
