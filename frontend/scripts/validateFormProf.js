'use strict';

// Form elements
const elements = {
  nome: document.querySelector('#nome'),
  cpf: document.querySelector('#cpf'),
  crm: document.querySelector('#crm'),
  email: document.querySelector('#email'),
  telefone: document.querySelector('#telefone'),
  endereco: document.querySelector('#endereco'),
  especialidade: document.querySelector('#especialidade'),
  labelNome: document.querySelector('#labelNome'),
  labelCPF: document.querySelector('#labelCPF'),
  labelCRM: document.querySelector('#labelCRM'),
  labelEmail: document.querySelector('#labelEmail'),
  labelTelefone: document.querySelector('#labelTelefone'),
  labelEndereco: document.querySelector('#labelEndereco'),
  labelEspecialidade: document.querySelector('#labelEspecialidade'),
};

// Validation states
const validation = {
  validNome: false,
  validCPF: false,
  validCRM: false,
  validEmail: false,
  validTelefone: false,
  validEndereco: false,
  validEspecialidade: false,
};

// Utility functions
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function setFieldValidation(
  field,
  label,
  isValid,
  errorMessage,
  successMessage
) {
  if (!field || !label) return;

  const color = isValid ? 'green' : 'red';
  const borderColor = isValid ? 'green' : 'red';

  label.setAttribute('style', `color: ${color}`);
  label.innerHTML = isValid ? successMessage : errorMessage;
  field.setAttribute('style', `border-color: ${borderColor}`);
}

// Validation functions
function validateNome() {
  const isValid = elements.nome.value.trim() !== '';
  validation.validNome = isValid;

  setFieldValidation(
    elements.nome,
    elements.labelNome,
    isValid,
    'Nome precisa ser preenchido',
    'Nome'
  );
}

function validateCPF() {
  const cpfValue = elements.cpf.value.replace(/\D/g, ''); // Remove non-digits
  const isValid = cpfValue.length === 11;
  validation.validCPF = isValid;

  setFieldValidation(
    elements.cpf,
    elements.labelCPF,
    isValid,
    'CPF precisa ter 11 dígitos',
    'CPF'
  );
}

function validateCRM() {
  const isValid = elements.crm.value.trim() !== '';
  validation.validCRM = isValid;

  setFieldValidation(
    elements.crm,
    elements.labelCRM,
    isValid,
    'CRM deve ser preenchido',
    'CRM'
  );
}

function validateEmailField() {
  const isValid = validateEmail(elements.email.value);
  validation.validEmail = isValid;

  setFieldValidation(
    elements.email,
    elements.labelEmail,
    isValid,
    'Email inválido',
    'Email'
  );
}

function validateTelefone() {
  const telefoneValue = elements.telefone.value.replace(/\D/g, ''); // Remove non-digits
  const isValid = telefoneValue.length >= 10;
  validation.validTelefone = isValid;

  setFieldValidation(
    elements.telefone,
    elements.labelTelefone,
    isValid,
    'Telefone precisa ter pelo menos 10 dígitos',
    'Telefone'
  );
}

function validateEndereco() {
  const isValid = elements.endereco.value.trim() !== '';
  validation.validEndereco = isValid;

  setFieldValidation(
    elements.endereco,
    elements.labelEndereco,
    isValid,
    'Endereço precisa ser preenchido',
    'Endereço'
  );
}

function validateEspecialidade() {
  const isValid = elements.especialidade.value.trim() !== '';
  validation.validEspecialidade = isValid;

  setFieldValidation(
    elements.especialidade,
    elements.labelEspecialidade,
    isValid,
    'Especialidade precisa ser preenchida',
    'Especialidade'
  );
}

// Event listeners
function setupEventListeners() {
  const validators = [
    { element: elements.nome, validator: validateNome },
    { element: elements.cpf, validator: validateCPF },
    { element: elements.crm, validator: validateCRM },
    { element: elements.email, validator: validateEmailField },
    { element: elements.telefone, validator: validateTelefone },
    { element: elements.endereco, validator: validateEndereco },
    { element: elements.especialidade, validator: validateEspecialidade },
  ];

  validators.forEach(({ element, validator }) => {
    if (element) {
      element.addEventListener('keyup', validator);
      element.addEventListener('blur', validator);
    }
  });
}

// Public function to check if all fields are valid
function isFormValid() {
  return Object.values(validation).every((isValid) => isValid);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
});

// Make validation function globally available
window.isFormValid = isFormValid;
window.validation = validation;
