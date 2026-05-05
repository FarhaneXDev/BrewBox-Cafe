import "dotenv/config"
import path from "path"
import { defineConfig } from "prisma/config"
import { PrismaPg } from "@prisma/adapter-pg"

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: "postgresql://neondb_owner:npg_cyZJlve4fMK6@ep-little-darkness-alwoyren-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require",
  },
  migrations: {
    seed: "node prisma/seed.js && node prisma/seed-admin.js",
  },
})