import prismaClient from "../../prisma/prisma.js";

class GetPacientByIdService {
  async execute(id) {
    const paciente = await prismaClient.paciente.findUnique({
      where: {
        id: id
      }
    });
    return paciente;
  }
}

export default GetPacientByIdService;