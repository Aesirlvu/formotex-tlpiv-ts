import "dotenv/config";

export const env = {
  server: {
    config: {
      port: Number(process.env.PORT) || 3000,
      host: process.env.HOST || "localhost",
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "jwt_secret_key",
    expiresIn: Number(process.env.JWT_EXPIRES_IN) || 24,
  },
  db: {
    config: {
      port: Number(process.env.DB_PORT) || 3306,
      host: process.env.DB_HOST || "localhost",
      database: process.env.DB_NAME || "gestion_inv_tlpiv",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "password",
    },
  },
};
