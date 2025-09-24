import { Router } from "express";
import CreatePacienteController from './controllers/paciente/CreatePacientCOntroller.js';
import ListPacientController from "./controllers/paciente/ListPacientController.js";
import GetPacientByIdController from "./controllers/paciente/GetPacientByIdController.js";
import UpdatePacienteController from "./controllers/paciente/UpdatePacienteController.js";
import DeletePacientController from "./controllers/paciente/DeletePacientController.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Paciente:
 *       type: object
 *       required:
 *         - nome
 *         - cpf
 *         - idade
 *         - email
 *         - telefone
 *         - endereco
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado automaticamente do paciente
 *         nome:
 *           type: string
 *           description: O nome do paciente
 *         cpf:
 *           type: string
 *           description: O CPF do paciente (único)
 *         idade:
 *           type: integer
 *           description: A idade do paciente
 *         email:
 *           type: string
 *           description: O email do paciente
 *         telefone:
 *           type: string
 *           description: O telefone de contato do paciente
 *         endereco:
 *           type: string
 *           description: O endereço do paciente
 *       example:
 *         id: "clvott758000008l45g3g4g3h"
 *         nome: "João da Silva"
 *         cpf: "123.456.789-00"
 *         idade: 42
 *         email: "joao.silva@example.com"
 *         telefone: "(11) 98765-4321"
 *         endereco: "Rua das Flores, 123"
 */

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: API para gerenciamento de pacientes
 */

/**
 * @swagger
 * /pacientes/list:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: A lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 */
router.get("/pacientes/list", new ListPacientController().handle);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Busca um paciente por ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/pacientes/:id", new GetPacientByIdController().handle);

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Paciente'
 *           example:
 *             nome: "Maria Oliveira"
 *             cpf: "987.654.321-01"
 *             idade: 35
 *             email: "maria.oliveira@example.com"
 *             telefone: "(21) 91234-5678"
 *             endereco: "Avenida Principal, 456"
 *     responses:
 *       201:
 *         description: O paciente foi criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: Erro de validação (ex. CPF duplicado)
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/pacientes", new CreatePacienteController().handle);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Atualiza um paciente existente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               idade:
 *                 type: integer
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               endereco:
 *                 type: string
 *           example:
 *             nome: "João da Silva Santos"
 *             email: "joao.santos@example.com"
 *     responses:
 *       200:
 *         description: O paciente foi atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/pacientes/:id", new UpdatePacienteController().handle);

/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Deleta um paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do paciente
 *     responses:
 *       200:
 *         description: O paciente foi deletado com sucesso
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/pacientes/:id", new DeletePacientController().handle);

export default router;