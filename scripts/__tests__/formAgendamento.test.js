const formatTime = require("../formatTime");
const { initFormAgendamento } = require("../formAgendamento");

// Mock Swal
global.Swal = {
  fire: jest.fn(),
};

// Make formatTime globally available for the script being tested
global.formatTime = formatTime;

describe("formatTime", () => {
  it("should format time from HHmm to HH:mm", () => {
    expect(formatTime("1030")).toBe("10:30");
    expect(formatTime("0900")).toBe("09:00");
  });
});

describe("formAgendamento interactions", () => {
  beforeEach(() => {
    // Reset mocks
    global.Swal.fire.mockClear();

    document.body.innerHTML = `
      <input id="paciente" value="John Doe">
      <input id="idade" value="30">
      <select id="especialidade">
        <option value="Cardiologia" selected>Cardiologia</option>
      </select>
      <select id="profissional">
        <option value="Dr. Smith" selected>Dr. Smith</option>
      </select>
      <select id="horario">
        <option value="1000" selected>10:00</option>
      </select>
      <div class="data-btn">22/07</div>
      <div class="confirmacao-info"></div>
      <button class="confirmar-btn">Confirmar</button>
    `;
    initFormAgendamento();
    document.dispatchEvent(new Event("DOMContentLoaded"));
  });

  it("should update confirmation info when a date is selected", () => {
    const dataBtn = document.querySelector(".data-btn");
    dataBtn.click();

    const confirmacaoInfo = document.querySelector(".confirmacao-info");
    const year = new Date().getFullYear();

    expect(confirmacaoInfo.innerHTML).toContain("Paciente: John Doe");
    expect(confirmacaoInfo.innerHTML).toContain("Especialidade: Cardiologia");
    expect(confirmacaoInfo.innerHTML).toContain("Profissional: Dr. Smith");
    expect(confirmacaoInfo.innerHTML).toContain(`Data: 22/07/${year}`);
    expect(confirmacaoInfo.innerHTML).toContain("Horário: 10:00");
  });
});
