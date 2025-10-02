import { body, validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

export class Validator {
  static userLogin() {
    return [
      body("email").isEmail().notEmpty().withMessage("Email is required"),
      body("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("Contraseña debe tener al menos 6 caracteres"),
    ];
  }
  static userRegister() {
    return [
      body("username").isString().notEmpty(),
      body("email").isEmail().notEmpty(),
      body("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres"),
      body("role").isIn(["admin", "user"]).optional(),
    ];
  }

  static equipmentCreate() {
    return [
      body("name").isString().notEmpty().withMessage("El nombre es requerido"),
      body("type").isString().notEmpty().withMessage("El tipo es requerido"),
      body("serialNumber")
        .isString()
        .notEmpty()
        .withMessage("El número de serie es requerido"),
      body("location")
        .isString()
        .notEmpty()
        .withMessage("La ubicación es requerida"),
      body("status")
        .isIn(["active", "inactive", "maintenance"])
        .withMessage("Estado inválido"),
      body("purchaseDate")
        .isDate()
        .withMessage("La fecha de compra es requerida"),
    ];
  }

  static equipmentUpdate() {
    return [
      body("name").isString().optional(),
      body("type").isString().optional(),
      body("serialNumber").isString().optional(),
      body("location").isString().optional(),
      body("status").isIn(["active", "inactive", "maintenance"]).optional(),
      body("purchaseDate").isDate().optional(),
    ];
  }

  static validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}
