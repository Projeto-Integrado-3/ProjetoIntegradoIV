import request from 'supertest';
import express from 'express';
import cors from 'cors';
import router from '../src/routes.js';

// Configurar a aplicação para testes
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

describe('API de Pacientes - Testes Automatizados', () => {
  let pacienteId;
  
  describe('POST /pacientes - Criar Paciente', () => {
    it('CT-POST-01: Deve criar um paciente com dados válidos', async () => {
      const novoPaciente = {
        nome: "Maria Silva Santos",
        cpf: "123.456.789-01",
        idade: 35,
        email: "maria.santos@email.com",
        telefone: "(11) 98765-4321",
        endereco: "Rua das Flores, 123, Centro, São Paulo - SP"
      };

      const response = await request(app)
        .post('/pacientes')
        .send(novoPaciente)
        .expect(201);

      // Salvar o ID para outros testes
      pacienteId = response.body.id;

      // Verificar se o paciente foi criado corretamente
      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe(novoPaciente.nome);
      expect(response.body.cpf).toBe(novoPaciente.cpf);
      expect(response.body.idade).toBe(novoPaciente.idade);
      expect(response.body.email).toBe(novoPaciente.email);
      expect(response.body.telefone).toBe(novoPaciente.telefone);
      expect(response.body.endereco).toBe(novoPaciente.endereco);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('CT-POST-02: Deve retornar erro ao tentar criar paciente com CPF duplicado', async () => {
      // Primeiro, criar um paciente
      const paciente1 = {
        nome: "Maria Silva Santos",
        cpf: "123.456.789-01",
        idade: 35,
        email: "maria.santos@email.com",
        telefone: "(11) 98765-4321",
        endereco: "Rua das Flores, 123, Centro, São Paulo - SP"
      };

      await request(app)
        .post('/pacientes')
        .send(paciente1)
        .expect(201);

      // Tentar criar outro paciente com o mesmo CPF
      const paciente2 = {
        nome: "Outra Pessoa Qualquer",
        cpf: "123.456.789-01",  // CPF duplicado
        idade: 28,
        email: "outra.pessoa@example.com",
        telefone: "(11) 90000-0000",
        endereco: "Rua XYZ, 999"
      };

      const response = await request(app)
        .post('/pacientes')
        .send(paciente2)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Paciente já existe');
    });

    it('Deve retornar erro 400 ao tentar criar paciente sem CPF', async () => {
      const pacienteInvalido = {
        nome: "João Silva",
        // cpf ausente (obrigatório)
        idade: 30,
        email: "joao@email.com",
        telefone: "(11) 98765-4321",
        endereco: "Rua Teste, 123"
      };

      const response = await request(app)
        .post('/pacientes')
        .send(pacienteInvalido)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('CPF é obrigatório');
    });

    it('Deve retornar erro 400 ao tentar criar paciente com CPF vazio', async () => {
      const pacienteInvalido = {
        nome: "João Silva",
        cpf: "", // CPF vazio
        idade: 30,
        email: "joao@email.com",
        telefone: "(11) 98765-4321",
        endereco: "Rua Teste, 123"
      };

      const response = await request(app)
        .post('/pacientes')
        .send(pacienteInvalido)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('CPF é obrigatório');
    });
  });

  describe('GET /pacientes/list - Listar Pacientes', () => {
    beforeEach(async () => {
      // Criar um paciente para os testes de listagem
      const paciente = {
        nome: "Ana Souza Silva",
        cpf: "987.654.321-00",
        idade: 28,
        email: "ana.souza@email.com",
        telefone: "(21) 91234-5678",
        endereco: "Av. Paulista, 1000"
      };

      const response = await request(app)
        .post('/pacientes')
        .send(paciente);

      pacienteId = response.body.id;
    });

    it('CT-GET-01: Deve listar todos os pacientes', async () => {
      const response = await request(app)
        .get('/pacientes/list')
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      
      const paciente = response.body[0];
      expect(paciente).toHaveProperty('id');
      expect(paciente).toHaveProperty('nome');
      expect(paciente).toHaveProperty('cpf');
      expect(paciente).toHaveProperty('idade');
      expect(paciente).toHaveProperty('email');
      expect(paciente).toHaveProperty('telefone');
      expect(paciente).toHaveProperty('endereco');
      expect(paciente).toHaveProperty('createdAt');
      expect(paciente).toHaveProperty('updatedAt');
    });

    it('Deve retornar array vazio quando não há pacientes', async () => {
      // Limpar todos os pacientes
      await request(app).delete(`/pacientes/${pacienteId}`);

      const response = await request(app)
        .get('/pacientes/list')
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(0);
    });
  });

  describe('GET /pacientes/:id - Buscar Paciente por ID', () => {
    beforeEach(async () => {
      // Criar um paciente para os testes de busca
      const paciente = {
        nome: "Carlos Eduardo Santos",
        cpf: "111.222.333-44",
        idade: 42,
        email: "carlos.eduardo@email.com",
        telefone: "(31) 94567-8901",
        endereco: "Rua Minas Gerais, 500"
      };

      const response = await request(app)
        .post('/pacientes')
        .send(paciente);

      pacienteId = response.body.id;
    });

    it('CT-GET-03: Deve buscar paciente por ID válido', async () => {
      const response = await request(app)
        .get(`/pacientes/${pacienteId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', pacienteId);
      expect(response.body).toHaveProperty('nome');
      expect(response.body).toHaveProperty('cpf');
      expect(response.body).toHaveProperty('idade');
      expect(response.body).toHaveProperty('email');
      expect(response.body).toHaveProperty('telefone');
      expect(response.body).toHaveProperty('endereco');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('CT-GET-02: Deve retornar erro 404 para ID inexistente', async () => {
      const idInexistente = 'id_que_nao_existe_123';

      const response = await request(app)
        .get(`/pacientes/${idInexistente}`)
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Paciente não encontrado.');
    });
  });

  describe('PUT /pacientes/:id - Atualizar Paciente', () => {
    beforeEach(async () => {
      // Criar um paciente para os testes de atualização
      const paciente = {
        nome: "Roberto Silva",
        cpf: "555.666.777-88",
        idade: 45,
        email: "roberto.silva@email.com",
        telefone: "(41) 95555-1234",
        endereco: "Rua Paraná, 789"
      };

      const response = await request(app)
        .post('/pacientes')
        .send(paciente);

      pacienteId = response.body.id;
    });

    it('CT-PUT-01: Deve atualizar paciente com dados válidos', async () => {
      const dadosAtualizados = {
        nome: "Roberto Silva Santos",
        cpf: "555.666.777-88",
        idade: 46,
        email: "roberto.santos@email.com",
        telefone: "(41) 95555-1234",
        endereco: "Rua Paraná, 789, Apto 101"
      };

      const response = await request(app)
        .put(`/pacientes/${pacienteId}`)
        .send(dadosAtualizados)
        .expect(200);

      expect(response.body.id).toBe(pacienteId);
      expect(response.body.nome).toBe(dadosAtualizados.nome);
      expect(response.body.idade).toBe(dadosAtualizados.idade);
      expect(response.body.email).toBe(dadosAtualizados.email);
      expect(response.body.endereco).toBe(dadosAtualizados.endereco);
      
      // Verificar que updatedAt foi alterado
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('Deve retornar erro 404 ao tentar atualizar paciente inexistente', async () => {
      const idInexistente = 'id_que_nao_existe_456';
      const dadosAtualizados = {
        nome: "Nome Atualizado",
        cpf: "999.888.777-66",
        idade: 30,
        email: "atualizado@email.com",
        telefone: "(11) 99999-9999",
        endereco: "Endereço Atualizado"
      };

      await request(app)
        .put(`/pacientes/${idInexistente}`)
        .send(dadosAtualizados)
        .expect(404);
    });
  });

  describe('DELETE /pacientes/:id - Deletar Paciente', () => {
    beforeEach(async () => {
      // Criar um paciente para os testes de deleção
      const paciente = {
        nome: "Pedro Henrique",
        cpf: "999.888.777-66",
        idade: 33,
        email: "pedro.henrique@email.com",
        telefone: "(51) 96666-7890",
        endereco: "Rua Rio Grande, 321"
      };

      const response = await request(app)
        .post('/pacientes')
        .send(paciente);

      pacienteId = response.body.id;
    });

    it('CT-DELETE-01: Deve deletar paciente existente', async () => {
      await request(app)
        .delete(`/pacientes/${pacienteId}`)
        .expect(200);

      // Verificar que o paciente foi realmente deletado
      await request(app)
        .get(`/pacientes/${pacienteId}`)
        .expect(404);
    });

    it('Deve retornar erro 404 ao tentar deletar paciente inexistente', async () => {
      const idInexistente = 'id_que_nao_existe_789';

      await request(app)
        .delete(`/pacientes/${idInexistente}`)
        .expect(404);
    });
  });

  describe('Testes de Integração', () => {
    it('Deve executar fluxo completo CRUD de paciente', async () => {
      // 1. Criar paciente
      const novoPaciente = {
        nome: "Teste Integração",
        cpf: "000.111.222-33",
        idade: 25,
        email: "integracao@teste.com",
        telefone: "(11) 90000-1111",
        endereco: "Rua Teste Integração, 123"
      };

      const createResponse = await request(app)
        .post('/pacientes')
        .send(novoPaciente)
        .expect(201);

      const pacienteId = createResponse.body.id;

      // 2. Buscar paciente criado
      const getResponse = await request(app)
        .get(`/pacientes/${pacienteId}`)
        .expect(200);

      expect(getResponse.body.nome).toBe(novoPaciente.nome);

      // 3. Atualizar paciente
      const dadosAtualizados = {
        ...novoPaciente,
        nome: "Teste Integração Atualizado"
      };

      const updateResponse = await request(app)
        .put(`/pacientes/${pacienteId}`)
        .send(dadosAtualizados)
        .expect(200);

      expect(updateResponse.body.nome).toBe(dadosAtualizados.nome);

      // 4. Verificar que aparece na listagem
      const listResponse = await request(app)
        .get('/pacientes/list')
        .expect(200);

      const pacienteNaLista = listResponse.body.find(p => p.id === pacienteId);
      expect(pacienteNaLista).toBeTruthy();
      expect(pacienteNaLista.nome).toBe(dadosAtualizados.nome);

      // 5. Deletar paciente
      await request(app)
        .delete(`/pacientes/${pacienteId}`)
        .expect(200);

      // 6. Verificar que foi deletado
      await request(app)
        .get(`/pacientes/${pacienteId}`)
        .expect(404);
    });
  });
});