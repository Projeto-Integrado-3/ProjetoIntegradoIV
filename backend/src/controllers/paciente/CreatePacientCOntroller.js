import CreatePacienteService from "../../services/pacientes/CreatePacientService.js";

class CreatePacienteController {
  async handle(req, res) {
    const { nome, cpf, idade, email, telefone, endereco } = req.body;

    try {
      const pacient = new CreatePacienteService();
      const paciente = await pacient.execute({
        nome,
        cpf,
        idade,
        email,
        telefone,
        endereco
      });
      return res.status(201).json(paciente);
    } catch (error) {
        if (error.message === 'Paciente já existe' || error.message === 'CPF é obrigatório') {
            return res.status(400).json({ error: error.message });
        }
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default CreatePacienteController;
