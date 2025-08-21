import { Router} from "express";
import CreatePacienteController from './controllers/paciente/CreatePacientCOntroller.js';
import ListPacientController from "./controllers/paciente/ListPacientController.js";
import UpdatePacienteController from "./controllers/paciente/UpdatePacienteController.js";


const router = Router();

router.get("/pacientes/list", new ListPacientController().handle);
router.post("/pacientes", new CreatePacienteController().handle);
router.put("/pacientes/:id", new UpdatePacienteController().handle);




export default router;


