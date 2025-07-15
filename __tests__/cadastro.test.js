// Teste unitário para validação de campos do cadastro.js
// Usando Jest

const {
  validateEmail,
  validateNome,
  validateSobrenome,
  validateSenha,
  validateConfirmSenha,
  validateCadastro
} = require('../scripts/cadastro');

describe('Validação de Email', () => {
  test('Email válido', () => {
    expect(validateEmail('teste@exemplo.com')).toBe(true);
  });

  test('Email inválido', () => {
    expect(validateEmail('teste@exemplo')).toBe(false);
    expect(validateEmail('teste.com')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });
});

describe('Validação de Nome e Sobrenome', () => {
  test('Nome e sobrenome inválidos (curtos)', () => {
    expect(validateNome('Jo')).toBe(false);
    expect(validateSobrenome('Li')).toBe(false);
  });
  test('Nome e sobrenome válidos', () => {
    expect(validateNome('João')).toBe(true);
    expect(validateSobrenome('Lima')).toBe(true);
  });
});

describe('Validação de Senha', () => {
  test('Senha inválida (curta)', () => {
    expect(validateSenha('12345')).toBe(false);
  });
  test('Senha válida', () => {
    expect(validateSenha('123456')).toBe(true);
  });
});

describe('Confirmação de Senha', () => {
  test('Confirmação diferente', () => {
    expect(validateConfirmSenha('abc123', 'abc124')).toBe(false);
  });
  test('Confirmação igual', () => {
    expect(validateConfirmSenha('abc123', 'abc123')).toBe(true);
  });
});

describe('Validação geral do cadastro', () => {
  const base = {
    nome: 'João',
    sobrenome: 'Lima',
    email: 'joao@exemplo.com',
    senha: '123456',
    confirmarsenha: '123456'
  };
  test('Cadastro válido', () => {
    expect(validateCadastro(base)).toBe(true);
  });
  test('Cadastro inválido (nome curto)', () => {
    expect(validateCadastro({ ...base, nome: 'Jo' })).toBe(false);
  });
  test('Cadastro inválido (email errado)', () => {
    expect(validateCadastro({ ...base, email: 'joao@exemplo' })).toBe(false);
  });
  test('Cadastro inválido (senha curta)', () => {
    expect(validateCadastro({ ...base, senha: '123', confirmarsenha: '123' })).toBe(false);
  });
  test('Cadastro inválido (confirmação diferente)', () => {
    expect(validateCadastro({ ...base, confirmarsenha: '654321' })).toBe(false);
  });
});
