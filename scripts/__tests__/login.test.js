/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';

describe('Login functionality', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = `
      <form>
        <input type="email" id="email" />
        <label id="emailLabel">Email</label>
        <input type="password" id="senha" />
        <label id="senhaLabel">Senha</label>
        <button type="button" id="btnEntrar">Entrar</button>
        <i class="fa-eye"></i>
      </form>
    `;

    // Reset mocks
    global.Swal.fire.mockClear();
    global.localStorage.getItem.mockClear();
    global.localStorage.setItem.mockClear();
  });

  test('should validate empty fields', async () => {
    // Mock empty localStorage
    global.localStorage.getItem.mockReturnValue(null);

    const { entrar } = await import('../login.js');

    entrar();

    expect(global.Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Campos obrigatórios',
      text: 'Por favor, preencha email e senha.',
    });
  });

  test('should validate user credentials', async () => {
    // Setup DOM with values
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('senha').value = 'password123';

    // Mock localStorage with user data
    const mockUsers = [
      { email: 'test@example.com', senha: 'password123', nome: 'Test User' },
    ];
    global.localStorage.getItem.mockReturnValue(JSON.stringify(mockUsers));

    const { entrar } = await import('../login.js');

    entrar();

    expect(global.Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'success',
        title: 'Login realizado com sucesso!',
      })
    );
  });

  test('should handle invalid credentials', async () => {
    // Setup DOM with values
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('senha').value = 'wrongpassword';

    // Mock localStorage with different user data
    const mockUsers = [
      {
        email: 'test@example.com',
        senha: 'correctpassword',
        nome: 'Test User',
      },
    ];
    global.localStorage.getItem.mockReturnValue(JSON.stringify(mockUsers));

    const { entrar } = await import('../login.js');

    entrar();

    expect(global.Swal.fire).toHaveBeenCalledWith({
      icon: 'error',
      title: 'Erro no login',
      text: 'Usuário ou senha incorretos!',
      confirmButtonText: 'Tentar novamente',
    });
  });

  test('should generate authentication token', async () => {
    const { generateToken } = await import('../login.js');

    const token = generateToken();

    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });
});
