import { compareSync, encryptSync } from "../helpers/bcrypt.js";
import { signJwt } from "../helpers/jwt.js";
import { User } from "../models/User.js";

export class AuthService {
  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Usuario no encontrado");

    if (!compareSync(password, user.password)) {
      throw new Error("Contraseña incorrecta");
    }

    return signJwt({ id: user.id, role: user.role });
  }

  async register(data: Partial<User>) {
    const exists = await User.findOne({ where: { email: data.email } });
    if (exists) throw new Error("El email ya está registrado");

    const user = await User.create({
      username: data.username,
      email: data.email,
      password: encryptSync(data.password!),
      role: data.role || "user",
    });

    return user;
  }

  async logout(userId: number) {
    return true;
  }
}
