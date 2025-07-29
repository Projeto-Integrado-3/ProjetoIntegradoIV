// Cole este código dentro do seu arquivo cypress/e2e/login.cy.js

describe('Testes da Tela de Login', () => {
  beforeEach(() => {
    // Visita a página de login antes de cada teste.
    // Se o seu arquivo de login não estiver na raiz, ajuste o caminho aqui.
    // Ex: cy.visit('/pages/login.html')
    cy.visit('/index.html'); // Ajuste este caminho se necessário!
  });

  it('✅ Deve realizar o login com sucesso com credenciais válidas', () => {
    // Lembre-se que estes dados são fictícios. O teste só passará
    // se a lógica no seu arquivo 'login.js' permitir.
    cy.get('#email').type('usuario.valido@exemplo.com');
    cy.get('#senha').type('senha123');
    cy.contains('button', 'Entrar').click();

    // Verificação: O que acontece após o login?
    // Vamos supor que ele redireciona para uma página 'dashboard.html'
    // **Ajuste '/dashboard.html' para a URL correta de destino.**
    cy.url().should('include', '/dashboard.html');
  });

  it('❌ Não deve realizar o login com senha incorreta', () => {
    cy.get('#email').type('usuario.valido@exemplo.com');
    cy.get('#senha').type('senhaErrada');
    cy.contains('button', 'Entrar').click();

    // Verificação: Procura a mensagem de erro na tela.
    // **Ajuste a mensagem para a que seu sistema realmente exibe.**
    cy.get('#msgError')
      .should('be.visible')
      .and('contain', 'Usuário ou senha inválidos'); // Ajuste esta mensagem!
  });

  it('➡️ Deve navegar para a página de cadastro ao clicar no link', () => {
    cy.contains('a', 'Cadastra-se').click();

    // Verificação: Confirma se a URL mudou para a página de cadastro.
    cy.url().should('include', '/pages/cadastro.html');
  });
});