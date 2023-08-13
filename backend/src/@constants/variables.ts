import { config } from "dotenv";
// config({ path: "backEnd/config/config.env" });
config();

// export const DATABASE_URL = process.env.DATABASE_URL ?? "";
export const DATABASE_URL = process.env["DATABASE_URL"] ?? "";
export const PORT = process.env["PORT"] ?? 8000;
