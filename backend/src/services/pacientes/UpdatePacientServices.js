import prismaClient from "../../prisma/prisma.js";

class UpdatePacientService {
  async execute(id, data) {
    const { nome, cpf, idade, email, telefone, endereco } = data;

    // Verifica se o paciente existe
    const pacienteExistente = await prismaClient.paciente.findUnique({
      where: { id },
    });

    if (!pacienteExistente) {
      throw new Error("Paciente não encontrado");
    }

    //  Só valida CPF se o campo for enviado
    if (cpf !== undefined) {
      const cpfExistente = await prismaClient.paciente.findUnique({
        where: { cpf },
      });

      if (cpfExistente && cpfExistente.id !== id) {
        throw new Error("CPF já cadastrado para outro paciente, não permitido alterar");
      }
    }

    // Remove campos undefined para evitar sobrescrita indevida
    const dadosAtualizados = Object.fromEntries(
      Object.entries({ nome, cpf, idade, email, telefone, endereco })
        .filter(([_, value]) => value !== undefined)
    );

    try {
      const pacienteAtualizado = await prismaClient.paciente.update({
        where: { id },
        data: dadosAtualizados,
      });
      return pacienteAtualizado;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao atualizar paciente");
    }
  }
}

export default UpdatePacientService;
