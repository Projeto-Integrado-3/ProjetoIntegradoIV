import UpdatePacientService from "../../services/pacientes/UpdatePacientServices.js";

class UpdatePacienteController {
	async handle(req, res) {
		const { id } = req.params;
		const { nome, cpf, idade, email, telefone, endereco } = req.body;

		try {
			const service = new UpdatePacientService();
			const pacienteAtualizado = await service.execute(id, {
				nome,
				cpf,
				idade,
				email,
				telefone,
				endereco
			});
			return res.status(200).json(pacienteAtualizado);
		} catch (error) {
			if (error.message === 'Paciente não encontrado') {
				return res.status(404).json({ error: error.message });
			}
			return res.status(500).json({ error: error.message });
		}
	}
}

export default UpdatePacienteController;
