import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userAdmin = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'ADMIN',
      email: 'admin@mail.com',
      password: 'Admin@123',
    },
  });

  const simpleUser = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'USER',
      email: 'user@mail.com',
      password: 'User@123',
    },
  });

  const artice1 = await prisma.article.upsert({
    where: { id: 1 },
    update: { author_id: userAdmin.id },
    create: {
      title: 'Article 1',
      description: 'Article 1 description',
      body: 'Article 1 body',
      is_published: false,
      author_id: userAdmin.id,
    },
  });

  const article2 = await prisma.article.upsert({
    where: { id: 2 },
    update: { author_id: userAdmin.id },
    create: {
      title: 'Article2',
      description: 'Article 2 description',
      body: 'Article 2 body',
      is_published: false,
      author_id: userAdmin.id,
    },
  });

  const article3 = await prisma.article.upsert({
    where: { id: 3 },
    update: { author_id: userAdmin.id },
    create: {
      title: 'Article 3',
      description: 'Article 3 description',
      body: 'Article 3 body',
      is_published: false,
      author_id: userAdmin.id,
    },
  });
  console.log({ userAdmin, simpleUser, artice1, article2, article3 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
