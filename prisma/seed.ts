import { PrismaClient } from "@prisma/client";
import { seedTenants } from "./seeders/tenants.seeder";
import { seedUsers } from "./seeders/users.seeder";
import { seedAngularTopics } from "./seeders/angular.seeder";
import { seedQuizQuestions } from "./seeders/quiz.seeder";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting modular database seeding...");

  try {
    await seedTenants(prisma);
    await seedUsers(prisma);
    await seedAngularTopics(prisma);
    await seedQuizQuestions(prisma);
    console.log("🎉 All seeder modules executed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
