'use strict';

// Sample exam data
const exames = [
  {
    id: 1,
    tipo: 'Hemograma',
    data: '2025-04-15',
    status: 'pendente',
    paciente: 'João Silva',
    medico: 'Dr. Santos',
  },
  {
    id: 2,
    tipo: 'Raio-X',
    data: '2025-04-16',
    status: 'agendado',
    paciente: 'Maria Santos',
    medico: 'Dra. Lima',
  },
  {
    id: 3,
    tipo: 'Ultrassom',
    data: '2025-04-14',
    status: 'concluido',
    paciente: 'Pedro Alves',
    medico: 'Dr. Costa',
  },
];

// Utility functions
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function createExamItem(exame) {
  return `
    <div class="exame-item">
      <div class="exame-info">
        <h3>${exame.tipo}</h3>
        <p>Paciente: ${exame.paciente}</p>
        <p>Médico: ${exame.medico}</p>
        <p>Data: ${formatDate(exame.data)}</p>
      </div>
      <div class="exame-actions">
        <button class="edit-btn" onclick="editExame(${exame.id})">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="delete-btn" onclick="deleteExame(${exame.id})">
          <i class="fas fa-trash"></i> Excluir
        </button>
      </div>
    </div>
  `;
}

// Tab management
function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-btn');

  tabs.forEach((tab) => tab.classList.remove('active'));
  buttons.forEach((btn) => btn.classList.remove('active'));

  const targetTab = document.getElementById(tabName);
  if (targetTab) {
    targetTab.classList.add('active');
  }

  const targetButton = document.querySelector(
    `[onclick="showTab('${tabName}')"]`
  );
  if (targetButton) {
    targetButton.classList.add('active');
  }

  renderExames(tabName);
}

// Render functions
function renderExames(status = 'pendentes') {
  const container = document.getElementById(status);
  if (!container) return;

  const statusFilter = status.endsWith('s') ? status.slice(0, -1) : status;
  const filteredExames = exames.filter(
    (exame) => exame.status === statusFilter
  );

  if (filteredExames.length === 0) {
    container.innerHTML = '<p class="no-results">Nenhum exame encontrado</p>';
  } else {
    container.innerHTML = filteredExames.map(createExamItem).join('');
  }
}

function renderFilteredExames(containerId, filteredExames) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (filteredExames.length === 0) {
    container.innerHTML = '<p class="no-results">Nenhum exame encontrado</p>';
  } else {
    container.innerHTML = filteredExames.map(createExamItem).join('');
  }
}

// CRUD operations
function editExame(id) {
  const exame = exames.find((exam) => exam.id === id);
  if (exame) {
    Swal.fire({
      title: 'Editar Exame',
      html: `
        <input id="swal-tipo" class="swal2-input" placeholder="Tipo" value="${exame.tipo}">
        <input id="swal-paciente" class="swal2-input" placeholder="Paciente" value="${exame.paciente}">
        <input id="swal-medico" class="swal2-input" placeholder="Médico" value="${exame.medico}">
        <input id="swal-data" type="date" class="swal2-input" value="${exame.data}">
        <select id="swal-status" class="swal2-input">
          <option value="pendente" ${exame.status === 'pendente' ? 'selected' : ''}>Pendente</option>
          <option value="agendado" ${exame.status === 'agendado' ? 'selected' : ''}>Agendado</option>
          <option value="concluido" ${exame.status === 'concluido' ? 'selected' : ''}>Concluído</option>
        </select>
      `,
      confirmButtonText: 'Salvar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const tipo = document.getElementById('swal-tipo').value;
        const paciente = document.getElementById('swal-paciente').value;
        const medico = document.getElementById('swal-medico').value;
        const data = document.getElementById('swal-data').value;
        const status = document.getElementById('swal-status').value;

        if (!tipo || !paciente || !medico || !data) {
          Swal.showValidationMessage('Todos os campos são obrigatórios');
          return false;
        }

        return { tipo, paciente, medico, data, status };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const index = exames.findIndex((exam) => exam.id === id);
        if (index !== -1) {
          exames[index] = { ...exames[index], ...result.value };
          const activeTab = document.querySelector('.tab-content.active');
          if (activeTab) {
            renderExames(activeTab.id);
          }

          Swal.fire({
            icon: 'success',
            title: 'Exame atualizado!',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  }
}

function deleteExame(id) {
  const exame = exames.find((exam) => exam.id === id);
  if (!exame) return;

  Swal.fire({
    title: 'Confirmar exclusão',
    text: `Tem certeza que deseja excluir o exame ${exame.tipo}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, excluir!',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      const index = exames.findIndex((exam) => exam.id === id);
      if (index !== -1) {
        exames.splice(index, 1);
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
          renderExames(activeTab.id);
        }

        Swal.fire({
          icon: 'success',
          title: 'Exame excluído!',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  });
}

// Search functionality
function setupSearch() {
  const searchInput = document.getElementById('searchExam');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const activeTab = document.querySelector('.tab-content.active');
      if (!activeTab) return;

      const activeTabId = activeTab.id;
      const statusFilter = activeTabId.endsWith('s')
        ? activeTabId.slice(0, -1)
        : activeTabId;

      const filteredExames = exames.filter(
        (exame) =>
          exame.status === statusFilter &&
          (exame.tipo.toLowerCase().includes(searchTerm) ||
            exame.paciente.toLowerCase().includes(searchTerm) ||
            exame.medico.toLowerCase().includes(searchTerm))
      );

      renderFilteredExames(activeTabId, filteredExames);
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderExames('pendentes');
  setupSearch();
});

// Make functions globally available for onclick handlers
window.showTab = showTab;
window.editExame = editExame;
window.deleteExame = deleteExame;
