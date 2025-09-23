import express from 'express';
import prismaClient from '../../prisma/prisma.js';

class CreatePacienteService {
  async execute(data) {
    const { nome, cpf, idade, email, telefone, endereco } = data;

    // Validar se CPF foi fornecido
    if (!cpf) {
      throw new Error('CPF é obrigatório');
    }

    const pacienteExistente = await prismaClient.paciente.findUnique({
      where: { cpf }
    });

    if (pacienteExistente) {
      throw new Error('Paciente já existe');
    }

    try {
      const paciente = await prismaClient.paciente.create({
        data: {
          nome,
          cpf,
          idade,
          email,
          telefone,
          endereco
        }
      });
      return paciente;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }
}

export default CreatePacienteService;
