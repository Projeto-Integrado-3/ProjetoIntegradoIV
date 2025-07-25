/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

describe('Cadastro functionality', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <form>
        <input type="text" id="nome" />
        <label id="labelNome">Nome</label>
        <input type="text" id="sobrenome" />
        <label id="labelSobrenome">Sobrenome</label>
        <input type="email" id="email" />
        <label id="labelEmail">Email</label>
        <input type="password" id="senha" />
        <label id="labelSenha">Senha</label>
        <input type="password" id="confirmarsenha" />
        <label id="labelConfirmSenha">Confirmar senha</label>
        <button type="button" id="btnCadastrar">Cadastrar</button>
        <i class="fa-eye"></i>
        <i id="verConfirmSenha" class="fa-eye"></i>
      </form>
    `;

    // Reset mocks
    global.Swal.fire.mockClear();
    global.localStorage.getItem.mockClear();
    global.localStorage.setItem.mockClear();
  });

  test('should validate email format', () => {
    const emailInput = document.getElementById('email');
    const labelEmail = document.getElementById('labelEmail');

    // Trigger validation with invalid email
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('keyup'));

    expect(labelEmail.style.color).toBe('red');
    expect(labelEmail.innerHTML).toBe('Email inválido');
  });

  test('should validate valid email format', () => {
    const emailInput = document.getElementById('email');
    const labelEmail = document.getElementById('labelEmail');

    // Trigger validation with valid email
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('keyup'));

    expect(labelEmail.style.color).toBe('green');
    expect(labelEmail.innerHTML).toBe('Email');
  });

  test('should validate password length', () => {
    const senhaInput = document.getElementById('senha');
    const labelSenha = document.getElementById('labelSenha');

    // Test short password
    senhaInput.value = '123';
    senhaInput.dispatchEvent(new Event('keyup'));

    expect(labelSenha.style.color).toBe('red');
    expect(labelSenha.innerHTML).toBe('Senha *insira no mínimo 6 caracteres');
  });

  test('should validate password confirmation match', () => {
    const senhaInput = document.getElementById('senha');
    const confirmarsenhaInput = document.getElementById('confirmarsenha');
    const labelConfirmSenha = document.getElementById('labelConfirmSenha');

    // Set different passwords
    senhaInput.value = 'password123';
    confirmarsenhaInput.value = 'differentpassword';
    confirmarsenhaInput.dispatchEvent(new Event('keyup'));

    expect(labelConfirmSenha.style.color).toBe('red');
    expect(labelConfirmSenha.innerHTML).toBe('As senhas não coincidem');
  });

  test('should validate nome length', () => {
    const nomeInput = document.getElementById('nome');
    const labelNome = document.getElementById('labelNome');

    // Test short name
    nomeInput.value = 'AB';
    nomeInput.dispatchEvent(new Event('keyup'));

    expect(labelNome.style.color).toBe('red');
    expect(labelNome.innerHTML).toBe('Nome *insira no minimo 3 caracteres');
  });

  test('should successfully register valid user data', async () => {
    // Fill form with valid data
    document.getElementById('nome').value = 'João';
    document.getElementById('sobrenome').value = 'Silva';
    document.getElementById('email').value = 'joao@example.com';
    document.getElementById('senha').value = 'password123';
    document.getElementById('confirmarsenha').value = 'password123';

    // Trigger validation events to set validation flags
    ['nome', 'sobrenome', 'email', 'senha', 'confirmarsenha'].forEach((id) => {
      const element = document.getElementById(id);
      element.dispatchEvent(new Event('keyup'));
    });

    // Mock empty localStorage
    global.localStorage.getItem.mockReturnValue('[]');

    const { cadastrar } = await import('../cadastro.js');

    cadastrar();

    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      'listaUser',
      expect.stringContaining('joao@example.com')
    );

    expect(global.Swal.fire).toHaveBeenCalledWith({
      icon: 'success',
      title: 'Cadastro realizado com sucesso!',
      text: 'Você será redirecionado para a tela de login.',
      timer: 3000,
      showConfirmButton: false,
    });
  });
});
