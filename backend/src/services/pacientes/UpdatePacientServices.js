import prismaClient from '../../prisma/prisma.js';

class UpdatePacientService {
  async execute(id, data) {
    const { nome, cpf, idade, email, telefone, endereco } = data;

    // Verifica se o paciente existe
    const pacienteExistente = await prismaClient.paciente.findUnique({
      where: { id: Number(id) }
    });

    if (!pacienteExistente) {
      throw new Error('Paciente não encontrado');
    }

    try {
      const pacienteAtualizado = await prismaClient.paciente.update({
        where: { id: Number(id) },
        data: {
          nome,
          cpf,
          idade,
          email,
          telefone,
          endereco
        }
      });
      return pacienteAtualizado;
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao atualizar paciente');
    }
  }
}

export default UpdatePacientService;
