'use strict';

// Get user data from localStorage
const userLogado = JSON.parse(localStorage.getItem('userLogado'));
const logadoElement = document.querySelector('#logado');

function checkUserAuthentication() {
  if (!userLogado) {
    Swal.fire({
      icon: 'error',
      title: 'Acesso Negado',
      text: 'Você precisa estar logado para acessar essa página!',
      confirmButtonText: 'OK',
    }).then(() => {
      window.location.href = '../login.html';
    });
  } else if (logadoElement) {
    logadoElement.innerHTML = `👋 Olá, ${userLogado.usuario}`;
  }
}

function sair() {
  Swal.fire({
    title: 'Confirmar logout',
    text: 'Deseja realmente sair do sistema?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sim, sair',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      // Clear authentication data
      localStorage.removeItem('token');
      localStorage.removeItem('userLogado');

      Swal.fire({
        icon: 'success',
        title: 'Logout realizado com sucesso!',
        text: 'Você será redirecionado para a página inicial.',
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = '../../index.html';
      });
    }
  });
}

// Initialize authentication check
checkUserAuthentication();

// Make sair function globally available
window.sair = sair;
