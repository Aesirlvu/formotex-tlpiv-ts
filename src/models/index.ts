import { User } from "./User.js";
import { Equipment } from "./Equipment.js";

// Definir asociaciones entre modelos
function associations() {
  User.hasMany(Equipment, { foreignKey: "userId", as: "equipments" });
  Equipment.belongsTo(User, { foreignKey: "userId", as: "user" });
}

export { associations };
