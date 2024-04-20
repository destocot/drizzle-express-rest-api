import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  LOG_LEVEL: z.string().min(1).optional(),
  PORT: z.coerce.number().optional(),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
});

const config = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

const parsedConfig = envSchema.safeParse(config);

if (!parsedConfig.success) {
  const error = parsedConfig.error.errors[0]?.path[0] ?? "";
  throw new Error(`Missing environment variable ${error}`);
}

export default parsedConfig.data;
