import { ERROR_MESSAGES } from "../helpers/errors.js";
import type { IRepository } from "../interfaces/IRepository.js";
import { Equipment } from "../models/Equipment.js";
import type { EquipmentRepository } from "../repositories/equipment.repository.js";

export class EquipmentService implements IRepository<Equipment> {
  private equipmentRepository: EquipmentRepository;

  constructor(equipmentRepository: EquipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  // TODO: implementar validaciones y lógica de negocio
  async findById(id: number): Promise<Equipment | null> {
    if (!id) {
      throw ERROR_MESSAGES.EQUIPMENT.ID_REQUIRED;
    }

    const equipment = await this.equipmentRepository.findById(id);
    if (!equipment) {
      throw ERROR_MESSAGES.EQUIPMENT.NOT_FOUND;
    }

    return equipment;
  }
  async findAll(): Promise<Equipment[]> {
    const equipments = await this.equipmentRepository.findAll();
    if (!equipments || equipments.length === 0) {
      throw ERROR_MESSAGES.EQUIPMENT.NO_EQUIPMENTS_FOUND;
    }
    return equipments;
  }
  async create(data: Partial<Equipment>): Promise<Equipment> {
    const { name, type, serialNumber } = data;

    if (!name || !type || !serialNumber) {
      throw ERROR_MESSAGES.EQUIPMENT.REQUIRED_FIELDS;
    }

    const exists = await this.equipmentRepository.findBySerialNumber(
      serialNumber
    );

    if (exists) {
      throw ERROR_MESSAGES.EQUIPMENT.ALREADY_ASSIGNED;
    }

    return await this.equipmentRepository.create(data);
  }
  async update(
    id: number,
    data: Partial<Equipment>
  ): Promise<Equipment | null> {
    return await this.equipmentRepository.update(id, data);
  }
  async delete(id: number): Promise<boolean> {
    return await this.equipmentRepository.delete(id);
  }
  // TODO: añadir más métodos especificos de equipment
  // ? métodos para asignar y desasignar equipos a usuarios según su rol
  // ? métodos para gestionar el estado del equipo (disponible, en uso, en mantenimiento, etc.)

  async getEquipmentsByType(type: string): Promise<Equipment[]> {
    // ? lógica para obtener equipos por tipo
    if (!type) {
      throw ERROR_MESSAGES.EQUIPMENT.TYPE_REQUIRED;
    }
    const equipments = await this.equipmentRepository.findAll();

    if (!equipments || equipments.length === 0) {
      throw ERROR_MESSAGES.EQUIPMENT.NO_EQUIPMENTS_FOUND;
    }
    return equipments.filter((equipment) => equipment.type === type);
  }

  async assignEquipmentToUser(equipmentId: number, userId: number) {
    // ? lógica para asignar equipo a usuario
  }
}
