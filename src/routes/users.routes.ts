import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { UserService } from "../services/user.service.js";
import { UserRepository } from "../repositories/user.repositories.js";

const router = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// ? middlewares de autorización

// ? CRUD básico
router.get("/", userController.getAllUsers.bind(userController));
router.get("/:id", userController.getUserById.bind(userController));
router.post("/", userController.createUser.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));

export default router;
