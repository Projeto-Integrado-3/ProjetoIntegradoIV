'use strict';

// Form elements
const elements = {
  email: document.querySelector('#email'),
  emailLabel: document.querySelector('#emailLabel'),
  senha: document.querySelector('#senha'),
  senhaLabel: document.querySelector('#senhaLabel'),
  btnShowPassword: document.querySelector('.fa-eye'),
};

function resetFieldStyles() {
  if (elements.emailLabel && elements.email) {
    elements.emailLabel.setAttribute('style', 'color: initial');
    elements.email.setAttribute('style', 'border-color: initial');
  }

  if (elements.senhaLabel && elements.senha) {
    elements.senhaLabel.setAttribute('style', 'color: initial');
    elements.senha.setAttribute('style', 'border-color: initial');
  }
}

function setErrorStyles() {
  if (elements.emailLabel && elements.email) {
    elements.emailLabel.setAttribute('style', 'color: red');
    elements.email.setAttribute('style', 'border-color: red');
  }

  if (elements.senhaLabel && elements.senha) {
    elements.senhaLabel.setAttribute('style', 'color: red');
    elements.senha.setAttribute('style', 'border-color: red');
  }

  if (elements.email) {
    elements.email.focus();
  }
}

function validateUser(email, senha) {
  const listaUser = JSON.parse(localStorage.getItem('listaUser')) || [];

  return listaUser.find((user) => user.email === email && user.senha === senha);
}

function generateToken() {
  return Math.random().toString(16).substring(2);
}

function entrar() {
  if (!elements.email || !elements.senha) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Elementos do formulário não encontrados!',
    });
    return;
  }

  const email = elements.email.value.trim();
  const senha = elements.senha.value;

  // Reset previous error styles
  resetFieldStyles();

  // Validate inputs
  if (!email || !senha) {
    Swal.fire({
      icon: 'error',
      title: 'Campos obrigatórios',
      text: 'Por favor, preencha email e senha.',
    });
    return;
  }

  // Validate user credentials
  const userValid = validateUser(email, senha);

  if (userValid) {
    // Generate and store authentication token
    const token = generateToken();
    localStorage.setItem('token', token);

    // Store logged user data
    const userLoggedData = {
      email: userValid.email,
      senha: userValid.senha,
      usuario: userValid.nome,
    };
    localStorage.setItem('userLogado', JSON.stringify(userLoggedData));

    Swal.fire({
      icon: 'success',
      title: 'Login realizado com sucesso!',
      text: 'Você será redirecionado para a página inicial.',
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = '../pages/dashboard/dashboard.html';
    });
  } else {
    setErrorStyles();

    Swal.fire({
      icon: 'error',
      title: 'Erro no login',
      text: 'Usuário ou senha incorretos!',
      confirmButtonText: 'Tentar novamente',
    });
  }
}

function togglePasswordVisibility() {
  if (!elements.senha) return;

  const currentType = elements.senha.getAttribute('type');
  elements.senha.setAttribute(
    'type',
    currentType === 'password' ? 'text' : 'password'
  );
}

// Event listeners
if (elements.btnShowPassword) {
  elements.btnShowPassword.addEventListener('click', togglePasswordVisibility);
}

// Make entrar function globally available
window.entrar = entrar;
