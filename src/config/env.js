import { config } from 'dotenv';
config();

export const env = {
  port: process.env.PORT ?? 3001,
  database: {
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT ? parseInt(process.env.DB_MYSQL_PORT) : 3306,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
  }
}