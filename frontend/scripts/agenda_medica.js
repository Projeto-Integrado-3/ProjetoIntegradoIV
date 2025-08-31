document.addEventListener('DOMContentLoaded', function () {
  // Lógica para os botões do nav
  document
    .querySelector('nav a[href="/pages/consultas.html"]')
    .addEventListener('click', function (event) {
      event.preventDefault(); // Impede o comportamento padrão do link
      window.location.href = '/pages/consultas.html';
    });

  document
    .querySelector('nav a[href="/pages/agenda_medica.html"]')
    .addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = '/pages/agenda_medica.html';
    });

  document
    .querySelector('nav a[href="/pages/dashboard/historico.html"]')
    .addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = '/pages/dashboard/historico.html';
    });

  document
    .querySelector('nav a[href="/pages/pacientes/litarPacientes.html"]')
    .addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = '/pages/pacientes/litarPacientes.html';
    });

  document
    .querySelector(
      'nav a[href="/pages/profissionalSaude/listarProfissional.html"]'
    )
    .addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = '/pages/profissionalSaude/listarProfissional.html';
    });

  document
    .querySelector('nav a[href="/pages/dashboard/dashboard.html"]')
    .addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = '/pages/dashboard/dashboard.html';
    });

  // Lógica para o botão "Sair"
  document
    .getElementById('logout-button')
    .addEventListener('click', function () {
      // Lógica para finalizar a sessão
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: 'Sessão finalizada!',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          window.location.href = '/index.html';
        });
      } else {
        window.location.href = '/index.html';
      }
    });
});
