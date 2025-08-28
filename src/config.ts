import dotenv from "dotenv";
dotenv.config();

if (!process.env.MANGO_DB_URL) {
  throw new Error("Missing DMANGO_DB_URL in environment");
}

export const env = {
  PORT: process.env.PORT || "5000",
  MANGO_DB_URL: process.env.MANGO_DB_URL,
};
