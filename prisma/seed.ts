import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.admin.upsert({
    where: { email: "admin@maajfurniture.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@maajfurniture.com",
      password: hashedPassword,
      role: "SUPERADMIN",
    },
  });

  const categories = [
    { name: "Sofa", slug: "sofa" },
    { name: "Bed", slug: "bed" },
    { name: "Dining", slug: "dining" },
    { name: "Chair", slug: "chair" },
    { name: "Office", slug: "office" },
    { name: "Wardrobe", slug: "wardrobe" },
    { name: "TV Unit", slug: "tv-unit" },
    { name: "Coffee Table", slug: "coffee-table" },
    { name: "Mattress", slug: "mattress" },
  ];

  for (const [index, cat] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { ...cat, order: index },
    });
  }

  await prisma.siteSettings.upsert({
    where: { id: "1" },
    update: {},
    create: {},
  });

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
