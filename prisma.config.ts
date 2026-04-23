import "dotenv/config"
import path from "path"
import { defineConfig } from "prisma/config"
import { PrismaPg } from "@prisma/adapter-pg"

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL as string,
  },
  migrations: {
    seed: "node prisma/seed.js && node prisma/seed-admin.js",
  },
  
})