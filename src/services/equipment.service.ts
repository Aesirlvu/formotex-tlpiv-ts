import type { IService } from "../interfaces/IService.js";
import { Equipment } from "../models/Equipment.js";

export class EquipmentService implements IService<Equipment> {
  // TODO: implementar validaciones y lógica de negocio
  async findById(id: number): Promise<Equipment | null> {
    return await Equipment.findByPk(id);
  }
  async findAll(): Promise<Equipment[]> {
    return await Equipment.findAll();
  }
  async create(data: Partial<Equipment>): Promise<Equipment> {
    return await Equipment.create(data);
  }
  async update(
    id: number,
    data: Partial<Equipment>
  ): Promise<Equipment | null> {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) return null;
    return await equipment.update(data);
  }
  async delete(id: number): Promise<boolean> {
    const deletedCount = await Equipment.destroy({ where: { id } });
    return deletedCount > 0;
  }
  // TODO: añadir más métodos especificos de equipment
  // ? métodos para asignar y desasignar equipos a usuarios según su rol
  // ? métodos para gestionar el estado del equipo (disponible, en uso, en mantenimiento, etc.)
}
