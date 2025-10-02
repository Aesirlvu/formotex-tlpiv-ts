import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    try {
      const token = await this.authService.login(
        req.body.email,
        req.body.password
      );
      res.json({ token });
    } catch (err: any) {
      res.status(401).json({ error: err.message });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  // async logout(req: Request, res: Response) {
  //   try {
  //     await this.authService.logout(req.user.id);
  //     res.status(204).send();
  //   } catch (err: any) {
  //     res.status(400).json({ error: err.message });
  //   }
  // }
}
