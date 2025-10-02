import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { Validator } from "../middlewares/validator.js";
import { AuthService } from "../services/auth.service.js";

const router = Router();
const authController = new AuthController(new AuthService());

router.post(
  "/login",
  Validator.userLogin(),
  Validator.validate,
  authController.login.bind(authController)
);
router.post(
  "/register",
  Validator.userRegister(),
  Validator.validate,
  authController.register.bind(authController)
);
// router.post(
//   "/logout",
//   Authorization.isAuthenticated(),
// //   authController.logout.bind(authController)
// );

export default router;
