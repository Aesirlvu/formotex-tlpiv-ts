import type { IService } from "../interfaces/IService.js";
import { User } from "../models/User.js";

export class UserService implements IService<User> {
  // TODO: implementar validaciones y lógica de negocio
  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }
  // TODO: método para buscar usuarios por su email
  async findAll(): Promise<User[]> {
    return await User.findAll();
  }
  async create(data: Partial<User>): Promise<User> {
    return await User.create(data);
  }
  async update(id: number, data: Partial<User>): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(data);
  }
  async delete(id: number): Promise<boolean> {
    const deletedCount = await User.destroy({ where: { id } });
    return deletedCount > 0;
  }
  // TODO: añadir más métodos especificos de user
  // ? métodos para gestionar roles y permisos
  // ? métodos para gestionar autenticación y autorización
}
