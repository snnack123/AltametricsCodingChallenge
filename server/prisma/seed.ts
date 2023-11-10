import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Mihai Adrian Lungu',
    email: 'adrian.lungu199@gmail.com',
    password: 'Password123!',
    invoices: {
      create: [
        ...Array.from({ length: 20 }).map((_, i) => ({
          details: `Invoice ${i + 2}`,
          amount: 299,
          dueDate: new Date(`2023-01-0${i + 1}`),
        })),
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
