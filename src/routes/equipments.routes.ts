import { Router } from "express";
import { EquipmentController } from "../controllers/equipment.controller.js";
import { Validator } from "../middlewares/validator.js";
import { EquipmentService } from "../services/equipment.service.js";
import { EquipmentRepository } from "../repositories/equipment.repository.js";

const router = Router();
const equipmentRepository = new EquipmentRepository();
const equipmentService = new EquipmentService(equipmentRepository);
const equipmentController = new EquipmentController(equipmentService);

// ? CRUD básico
router.get(
  "/",
  //   Authorization.isAuthenticated(),
  equipmentController.getEquipment.bind(equipmentController)
);
router.get(
  "/:id",
  //   Authorization.isAuthenticated(),
  equipmentController.getEquipmentById.bind(equipmentController)
);

router.post(
  "/",
  //   Authorization.isAdmin(),
  Validator.equipmentCreate(),
  Validator.validate,
  equipmentController.createEquipment.bind(equipmentController)
);

router.put(
  "/:id",
  //   Authorization.isAdmin(),
  Validator.equipmentUpdate(),
  Validator.validate,
  equipmentController.updateEquipment.bind(equipmentController)
);

router.delete(
  "/:id",
  //   Authorization.isAdmin(),
  equipmentController.deleteEquipment.bind(equipmentController)
);

// Rutas extra
router.post(
  "/:id/assign",
  //   Authorization.isAdmin(),
  equipmentController.assignEquipmentToUser.bind(equipmentController)
);
router.post(
  "/:id/unassign",
  //   Authorization.isAdmin(),
  equipmentController.unassignEquipmentFromUser.bind(equipmentController)
);
router.get(
  "/user/:userId",
  //   Authorization.isAuthenticated(),
  equipmentController.getEquipmentByUserId.bind(equipmentController)
);
router.get(
  "/available",
  //   Authorization.isAuthenticated(),
  equipmentController.getAvailableEquipment.bind(equipmentController)
);
router.put(
  "/:id/status",
  //   Authorization.isAdmin(),
  equipmentController.updateEquipmentStatus.bind(equipmentController)
);
router.get(
  "/serial/:serialNumber",
  //   Authorization.isAuthenticated(),
  equipmentController.getEquipmentBySerialNumber.bind(equipmentController)
);

export default router;
