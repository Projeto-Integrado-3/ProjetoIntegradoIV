'use strict';

// Storage keys
const STORAGE_KEY = 'db_prof';

// Modal functions
const openModal = () => {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.add('active');
  }
};

const closeModal = () => {
  clearFields();
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('active');
  }
};

// Storage functions
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const setLocalStorage = (dbClient) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dbClient));
};

// CRUD operations
const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
};

const updateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};

const readClient = () => getLocalStorage();

const createClient = (client) => {
  const dbClient = getLocalStorage();
  dbClient.push(client);
  setLocalStorage(dbClient);
};

const isValidFields = () => {
  const form = document.getElementById('form');
  return form ? form.reportValidity() : false;
};

// Field management
const clearFields = () => {
  const fields = document.querySelectorAll('.modal-field');
  fields.forEach((field) => {
    field.value = '';
  });
};

const saveClient = () => {
  if (isValidFields()) {
    const client = {
      nome: document.getElementById('nome')?.value.trim() || '',
      cpf: document.getElementById('cpf')?.value.trim() || '',
      crm: document.getElementById('crm')?.value.trim() || '',
      email: document.getElementById('email')?.value.trim() || '',
      telefone: document.getElementById('telefone')?.value.trim() || '',
      endereco: document.getElementById('endereco')?.value.trim() || '',
      especialidade:
        document.getElementById('especialidade')?.value.trim() || '',
    };

    // Validate required fields
    const requiredFields = [
      'nome',
      'cpf',
      'crm',
      'email',
      'telefone',
      'endereco',
      'especialidade',
    ];
    const emptyFields = requiredFields.filter((field) => !client[field]);

    if (emptyFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Todos os campos devem ser preenchidos corretamente.',
      });
      return;
    }

    const nomeInput = document.getElementById('nome');
    const index = nomeInput?.dataset.index;

    if (index === 'new') {
      createClient(client);
    } else {
      updateClient(parseInt(index), client);
    }

    updateTable();

    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Profissional salvo com sucesso!',
      timer: 2000,
      showConfirmButton: false,
    });

    closeModal();
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Preencha todos os campos corretamente antes de salvar.',
    });
  }
};

// Table management
const createRow = (client, index) => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td data-label="Nome">${client.nome}</td>
    <td data-label="CPF">${client.cpf}</td>
    <td data-label="CRM">${client.crm}</td>
    <td data-label="E-mail">${client.email}</td>
    <td data-label="Telefone">${client.telefone}</td>
    <td data-label="Endereço">${client.endereco}</td>
    <td data-label="Especialidade">${client.especialidade}</td>
    <td>
      <button type="button" class="button green" id="edit-${index}">Editar</button>
      <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
  `;

  const tableBody = document.querySelector('#tableClient>tbody');
  if (tableBody) {
    tableBody.appendChild(newRow);
  }
};

const clearTable = () => {
  const rows = document.querySelectorAll('#tableClient>tbody tr');
  rows.forEach((row) => {
    if (row.parentNode) {
      row.parentNode.removeChild(row);
    }
  });
};

const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
};

const fillFields = (client) => {
  const fields = [
    { id: 'nome', value: client.nome },
    { id: 'cpf', value: client.cpf },
    { id: 'crm', value: client.crm },
    { id: 'email', value: client.email },
    { id: 'telefone', value: client.telefone },
    { id: 'endereco', value: client.endereco },
    { id: 'especialidade', value: client.especialidade },
  ];

  fields.forEach((field) => {
    const element = document.getElementById(field.id);
    if (element) {
      element.value = field.value;
    }
  });

  const nomeInput = document.getElementById('nome');
  if (nomeInput) {
    nomeInput.dataset.index = client.index;
  }
};

const editClient = (index) => {
  const client = readClient()[index];
  if (client) {
    client.index = index;
    fillFields(client);

    const modalHeader = document.querySelector('.modal-header>h2');
    if (modalHeader) {
      modalHeader.textContent = `Editando profissional ${client.nome}`;
    }

    openModal();
  }
};

const editDelete = (event) => {
  if (event.target.type === 'button') {
    const [action, index] = event.target.id.split('-');

    if (action === 'edit') {
      editClient(parseInt(index));
    } else if (action === 'delete') {
      const client = readClient()[index];

      if (client) {
        Swal.fire({
          title: `Deseja realmente excluir o profissional ${client.nome}?`,
          text: 'Esta ação não pode ser desfeita!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sim, excluir!',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            deleteClient(parseInt(index));
            updateTable();

            Swal.fire({
              icon: 'success',
              title: 'Excluído!',
              text: `O profissional ${client.nome} foi excluído com sucesso.`,
              timer: 2000,
              showConfirmButton: false,
            });
          }
        });
      }
    }
  }
};

// Initialize table
updateTable();

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const cadastrarButton = document.getElementById('cadastrarCliente');
  if (cadastrarButton) {
    cadastrarButton.addEventListener('click', () => {
      const modalHeader = document.querySelector('.modal-header>h2');
      if (modalHeader) {
        modalHeader.textContent = 'Novo Profissional';
      }

      clearFields();

      const nomeInput = document.getElementById('nome');
      if (nomeInput) {
        nomeInput.dataset.index = 'new';
      }

      openModal();
    });
  }

  const modalCloseButton = document.getElementById('modalClose');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeModal);
  }

  const salvarButton = document.getElementById('salvar');
  if (salvarButton) {
    salvarButton.addEventListener('click', saveClient);
  }

  const cancelarButton = document.getElementById('cancelar');
  if (cancelarButton) {
    cancelarButton.addEventListener('click', closeModal);
  }

  const tableBody = document.querySelector('#tableClient>tbody');
  if (tableBody) {
    tableBody.addEventListener('click', editDelete);
  }
});
