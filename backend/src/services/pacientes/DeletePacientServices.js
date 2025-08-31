import prismaClient from "../../prisma/prisma.js";

class DeletePacientService {
  async execute(id) {
    // Verifica se o paciente existe
    const pacienteExistente = await prismaClient.paciente.findUnique({
      where: { id },
    });

    if (!pacienteExistente) {
      throw new Error("Paciente não encontrado");
    }

    try {
      await prismaClient.paciente.delete({
        where: { id },
      });
      return { message: "Paciente deletado com sucesso" };
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao deletar paciente");
    }
  }
}

export default DeletePacientService;
