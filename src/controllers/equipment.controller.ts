import type { Request, Response } from "express";
import { EquipmentService } from "../services/equipment.service.js";

export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  // TODO: implementar lógica de negocio y validaciones de unicidad
  async getEquipment(req: Request, res: Response) {
    const list = await this.equipmentService.findAll();
    res.json(list);
  }

  async getEquipmentById(req: Request, res: Response) {
    const equipment = await this.equipmentService.findById(
      Number(req.params.id)
    );
    if (!equipment)
      return res.status(404).json({ error: "Equipo no encontrado" });
    res.json(equipment);
  }

  async createEquipment(req: Request, res: Response) {
    try {
      const equipment = await this.equipmentService.create(req.body);
      res.status(201).json(equipment);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async updateEquipment(req: Request, res: Response) {
    try {
      const updated = await this.equipmentService.update(
        Number(req.params.id),
        req.body
      );
      if (!updated)
        return res.status(404).json({ error: "Equipo no encontrado" });
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteEquipment(req: Request, res: Response) {
    const deleted = await this.equipmentService.delete(Number(req.params.id));
    if (!deleted)
      return res.status(404).json({ error: "Equipo no encontrado" });
    res.status(204).send();
  }

  // ? Métodos extra relacionados con usuarios/admin
  async assignEquipmentToUser(req: Request, res: Response) {}
  async unassignEquipmentFromUser(req: Request, res: Response) {}
  async getEquipmentByUserId(req: Request, res: Response) {}
  async getAvailableEquipment(req: Request, res: Response) {}
  async updateEquipmentStatus(req: Request, res: Response) {}
  async getEquipmentBySerialNumber(req: Request, res: Response) {}
}
