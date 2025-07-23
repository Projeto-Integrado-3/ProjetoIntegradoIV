'use strict';

// Form elements
const elements = {
  pacienteInput: document.getElementById('paciente'),
  especialidadeSelect: document.getElementById('especialidade'),
  profissionalSelect: document.getElementById('profissional'),
  horarioSelect: document.getElementById('horario'),
  idadeInput: document.getElementById('idade'),
  dataBtns: document.querySelectorAll('.data-btn'),
  confirmacaoInfo: document.querySelector('.confirmacao-info'),
  confirmarBtn: document.querySelector('.confirmar-btn'),
};

let selectedDate = null;

// Utility functions
function formatTime(time) {
  return time.replace(/(\d{2})(\d{2})/, '$1:$2');
}

function updateConfirmation() {
  if (!elements.confirmacaoInfo) return;

  const paciente = elements.pacienteInput?.value || '';
  const especialidade = elements.especialidadeSelect?.value || '';
  const profissional =
    elements.profissionalSelect?.options[
      elements.profissionalSelect.selectedIndex
    ]?.text.trim() || '';
  const horario = elements.horarioSelect?.value
    ? formatTime(elements.horarioSelect.value)
    : '';

  if (paciente && especialidade && profissional && selectedDate && horario) {
    elements.confirmacaoInfo.innerHTML = `
      <p>Paciente: ${paciente}</p>
      <p>Especialidade: ${especialidade}</p>
      <p>Profissional: ${profissional}</p>
      <p>Data: ${selectedDate}</p>
      <p>Horário: ${horario}</p>
    `;
  }
}

function validateForm() {
  const requiredFields = [
    { element: elements.especialidadeSelect, name: 'Especialidade' },
    { element: elements.profissionalSelect, name: 'Profissional' },
    { element: elements.horarioSelect, name: 'Horário' },
  ];

  const emptyFields = requiredFields.filter((field) => !field.element?.value);

  if (emptyFields.length > 0 || !selectedDate) {
    const missingFields = emptyFields.map((field) => field.name).join(', ');
    const message = !selectedDate
      ? 'Por favor, selecione uma data.'
      : `Por favor, preencha os campos: ${missingFields}`;

    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: message,
    });
    return false;
  }

  return true;
}

function saveAppointment() {
  if (!validateForm()) return;

  const appointmentData = {
    paciente: elements.pacienteInput?.value || '',
    idade: elements.idadeInput?.value || '',
    especialidade: elements.especialidadeSelect?.value || '',
    profissional:
      elements.profissionalSelect?.options[
        elements.profissionalSelect.selectedIndex
      ]?.text || '',
    data: selectedDate,
    horario: formatTime(elements.horarioSelect?.value || ''),
    id: Date.now(), // Simple ID generation
    status: 'agendado',
  };

  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  appointments.push(appointmentData);
  localStorage.setItem('appointments', JSON.stringify(appointments));

  Swal.fire({
    icon: 'success',
    title: 'Agendamento Confirmado!',
    text: 'O agendamento foi salvo com sucesso.',
    timer: 2000,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = '/pages/agenda.html';
  });
}

// Event listeners setup
function setupEventListeners() {
  // Date buttons
  if (elements.dataBtns) {
    elements.dataBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        elements.dataBtns.forEach((b) => b.classList.remove('selected'));
        this.classList.add('selected');

        const year = new Date().getFullYear();
        selectedDate = `${this.textContent}/${year}`;
        updateConfirmation();
      });
    });
  }

  // Form selects
  const formSelects = [
    elements.especialidadeSelect,
    elements.profissionalSelect,
    elements.horarioSelect,
  ];
  formSelects.forEach((select) => {
    if (select) {
      select.addEventListener('change', updateConfirmation);
    }
  });

  // Patient input
  if (elements.pacienteInput) {
    elements.pacienteInput.addEventListener('input', updateConfirmation);
  }

  // Confirm button
  if (elements.confirmarBtn) {
    elements.confirmarBtn.addEventListener('click', saveAppointment);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
});
