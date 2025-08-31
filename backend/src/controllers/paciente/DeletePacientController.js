import DeletePacientService from "../../services/pacientes/DeletePacientServices.js";

class DeletePacientController {
  async handle(req, res) {
    const { id } = req.params;

    try {
      const service = new DeletePacientService();
      const resultado = await service.execute(id);
      return res.status(200).json(resultado);
    } catch (error) {
      if (error.message === "Paciente não encontrado") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro ao deletar paciente" });
    }
  }
}

export default DeletePacientController;
