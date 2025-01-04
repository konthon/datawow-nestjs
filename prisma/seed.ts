import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const COMMUNITIES = [
  'History',
  'Food',
  'Pets',
  'Health',
  'Fashion',
  'Exercise',
  'Others',
];

async function main() {
  console.log('PRISMA: start seeding');
  await prisma.community.createMany({
    data: COMMUNITIES.map((name) => ({ name })),
  });
  console.log('PRISMA: done seeding');
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
