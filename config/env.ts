function requireEnv(field: string): string {
  const value = process.env[field];
  
  if (!value) {
    throw new Error(`Environment variable ${field} is required`);
  }

  return value;
}

export const env = {
  PORT: requireEnv("PORT"),
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: requireEnv("DATABASE_URL"),
  SALT_ROUNDS: parseInt(requireEnv("SALT_ROUNDS"), 10),
  ACCESS_TOKEN_SECRET: requireEnv("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: requireEnv("REFRESH_TOKEN_SECRET"),
}