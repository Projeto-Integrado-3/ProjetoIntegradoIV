import ListPacientesService from "../../services/pacientes/ListPacientServices.js";

class ListPacientesController {
  async handle(req, res) {
    const pacientes =  new ListPacientesService()
    const result = await pacientes.execute()
    return res.json(result);
  }
}

export default ListPacientesController;
