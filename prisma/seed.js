import pkg from "../generated/prisma/index.js"; // or "@prisma/client" if you're using default output
const { PrismaClient, UserRole } = pkg;

// import prisma from "../src/prisma-client/prismaClient.js";

const prisma = new PrismaClient();

async function main() {
  // Super Admin seeding to Database
  const superAdminEmail =
    process.env.SUPERADMIN_EMAIL || "superadmin@example.com";

  const superAdmin = await prisma.user.upsert({
    where: { email: superAdminEmail },
    update: {
      name: "Super Admin",
      phone: "1234567890",
      address: "123 Admin St, HQ",
      role: UserRole.SUPER_ADMIN,
      department: "Administration",
      reportingBoss: null,
    },
    create: {
      email: superAdminEmail,
      name: "Super Admin",
      phone: "1234567890",
      address: "123 Admin St, HQ",
      role: UserRole.SUPER_ADMIN,
      department: "Administration",
      reportingBoss: null,
    },
  });

  console.log("✅ Super Admin seeded:", superAdmin.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Error seeding Super Admin:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
