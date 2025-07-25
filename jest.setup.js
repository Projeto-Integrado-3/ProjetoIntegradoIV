// Mock dos elementos do DOM
document.body.innerHTML = `
  <select id="paciente"></select>
  <select id="especialidade"></select>
  <select id="profissional"></select>
  <select id="horario"></select>
  <button id="submitBtn"></button>
`;

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// Mock do Swal (SweetAlert2)
global.Swal = {
  fire: jest.fn()
};
