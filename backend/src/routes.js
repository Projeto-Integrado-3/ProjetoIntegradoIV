import { Router} from "express";
import CreatePacienteController from './controllers/paciente/CreatePacientCOntroller.js';
import ListPacientController from "./controllers/paciente/ListPacientController.js";
import UpdatePacienteController from "./controllers/paciente/UpdatePacienteController.js";
import DeletePacientController from "./controllers/paciente/DeletePacientController.js";

const router = Router();

router.get("/pacientes/list", new ListPacientController().handle);
router.post("/pacientes", new CreatePacienteController().handle);
router.put("/pacientes/:id", new UpdatePacienteController().handle);
router.delete("/pacientes/:id", new DeletePacientController().handle);



export default router;


