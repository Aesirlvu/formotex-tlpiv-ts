import { DataTypes, Model } from "sequelize";
import { Database } from "../config/database.js";
import { encryptSync } from "../helpers/bcrypt.js";

const sequelizeConnection = Database.getInstance().getConnection();

export class User extends Model {
  declare id: number;
  public username!: string;
  public email!: string;
  declare password: string;
  public role!: "admin" | "user";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "user"]],
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "users",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

User.beforeSave(async (user: User) => {
  if (user.changed("password")) {
    user.password = encryptSync(user.password, 10);
  }
});
