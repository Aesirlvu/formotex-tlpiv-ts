import type { IRepository } from "../interfaces/IRepository.js";
import { Equipment } from "../models/Equipment.js";

export class EquipmentRepository implements IRepository<Equipment> {
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
    const equipment = await Equipment.findByPk(id);
    if (!equipment) return false;
    await equipment.destroy();
    return true;
  }

  async findBySerialNumber(serialNumber: string): Promise<Equipment | null> {
    return await Equipment.findOne({ where: { serialNumber } });
  }
}
