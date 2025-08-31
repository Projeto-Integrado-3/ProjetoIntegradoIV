import prismaClient from "../../prisma/prisma.js";

class ListPacientesService {
  async execute() {
    const pacientes = await prismaClient.paciente.findMany();
    return pacientes;
  }
}

export default ListPacientesService;
