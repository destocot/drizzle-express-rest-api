import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { faker } from "@faker-js/faker";
import fs from "node:fs";
import bcrypt from "bcrypt";
import * as schema from "@/drizzle/schema";
import config from "@/lib/config";
import logger from "@/lib/logger";

const sqlite = new Database(config.DATABASE_URL);

const db = drizzle(sqlite, { schema });

async function reset() {
  const resetArg = process.argv[2];
  if (resetArg === "--reset") {
    logger.info("🔥 Resetting database...");
    await db.delete(schema.UserTable);
  }
}

const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password({ memorable: true }),
};

const posts = Array.from({ length: 10 }, () => ({
  title: faker.lorem.words(),
  content: faker.lorem.paragraph(),
}));

const seed = async () => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    logger.info("🌱 Seeding user...");
    const row = await db
      .insert(schema.UserTable)
      .values({
        ...user,
        password: hashedPassword,
      })
      .returning({ id: schema.UserTable.id });

    const userId = row[0]?.id!;
    if (!userId) throw new Error("User ID not found");

    const postsWithUserId = posts.map((post) => ({ ...post, userId }));

    logger.info("🌱 Seeding posts...");
    const result = await db.insert(schema.PostTable).values(postsWithUserId);

    logger.info(`📝 Created user with ID: ${userId}`);

    fs.writeFileSync("seed-user.json", JSON.stringify(user, null, 2));

    logger.info(`📝 Inserted ${result.changes} posts`);
    sqlite.close();
  } catch (err) {
    logger.error(`Error: ${err}`);
  } finally {
    process.exit(0);
  }
};

reset().then(() => seed());
