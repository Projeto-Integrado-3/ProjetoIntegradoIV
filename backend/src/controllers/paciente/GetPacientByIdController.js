import GetPacientByIdService from "../../services/pacientes/GetPacientByIdService.js";

class GetPacientByIdController {
  async handle(req, res) {
    const { id } = req.params;
    
    try {
      const service = new GetPacientByIdService();
      const paciente = await service.execute(id);
      
      if (!paciente) {
        return res.status(404).json({ error: "Paciente não encontrado." });
      }
      
      return res.json(paciente);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

export default GetPacientByIdController;