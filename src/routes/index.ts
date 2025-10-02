import { Router } from "express";
import authRoutes from "./auth.routes.js";
import equipmentRoutes from "./equipments.routes.js";

const router = Router();

// ? Rutas de autenticación
router.use("/auth", authRoutes);

// ? Rutas de usuarios
// router.use("/users", userRoutes);

// ? Rutas de equipos
router.use("/equipment", equipmentRoutes);

export default router;
