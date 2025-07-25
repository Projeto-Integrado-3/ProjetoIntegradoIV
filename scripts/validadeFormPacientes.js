'use strict';

// Form elements
const elements = {
  nome: document.querySelector('#nome'),
  cpf: document.querySelector('#cpf'),
  email: document.querySelector('#email'),
  telefone: document.querySelector('#telefone'),
  endereco: document.querySelector('#endereco'),
  labelNome: document.querySelector('#labelNome'),
  labelCPF: document.querySelector('#labelCPF'),
  labelEmail: document.querySelector('#labelEmail'),
  labelTelefone: document.querySelector('#labelTelefone'),
  labelEndereco: document.querySelector('#labelEndereco'),
};

// Validation states
const validation = {
  validNome: false,
  validCPF: false,
  validEmail: false,
  validTelefone: false,
  validEndereco: false,
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

// Event listeners
function setupEventListeners() {
  if (elements.nome) {
    elements.nome.addEventListener('keyup', validateNome);
    elements.nome.addEventListener('blur', validateNome);
  }

  if (elements.cpf) {
    elements.cpf.addEventListener('keyup', validateCPF);
    elements.cpf.addEventListener('blur', validateCPF);
  }

  if (elements.email) {
    elements.email.addEventListener('keyup', validateEmailField);
    elements.email.addEventListener('blur', validateEmailField);
  }

  if (elements.telefone) {
    elements.telefone.addEventListener('keyup', validateTelefone);
    elements.telefone.addEventListener('blur', validateTelefone);
  }

  if (elements.endereco) {
    elements.endereco.addEventListener('keyup', validateEndereco);
    elements.endereco.addEventListener('blur', validateEndereco);
  }
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
