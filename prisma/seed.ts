import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const userAdmin = await prisma.user.upsert({
    where: { id: 1 },
    update: {
      fullName: 'Francisco De Oliveira',
      email: 'francisco.oliveira@mail.com',
      role: 'ADMIN',
      password: await bcrypt.hash('Foliveira@123', await bcrypt.genSalt(10)),
    },
    create: {
      fullName: 'Francisco De Oliveira',
      email: 'francisco.oliveira@mail.com',
      role: 'ADMIN',
      password: await bcrypt.hash('Foliveira@123', await bcrypt.genSalt(10)),
    },
  });

  const simpleUser = await prisma.user.upsert({
    where: { id: 2 },
    update: {
      fullName: 'Luiz Ribeiro',
      role: 'USER',
      email: 'luiz.ribeiro@mail.com',
      password: await bcrypt.hash('Lribeiro@123', await bcrypt.genSalt(10)),
    },
    create: {
      fullName: 'Luiz Ribeiro',
      role: 'USER',
      email: 'luiz.ribeiro@mail.com',
      password: await bcrypt.hash('Lribeiro@123', await bcrypt.genSalt(10)),
    },
  });

  const artice1 = await prisma.article.upsert({
    where: { id: 1 },
    update: { authorId: userAdmin.id },
    create: {
      title: 'Article 1',
      description: 'Article 1 description',
      body: 'Article 1 body',
      isPublished: false,
      authorId: userAdmin.id,
    },
  });

  const article2 = await prisma.article.upsert({
    where: { id: 2 },
    update: { authorId: userAdmin.id },
    create: {
      title: 'Article2',
      description: 'Article 2 description',
      body: 'Article 2 body',
      isPublished: false,
      authorId: userAdmin.id,
    },
  });

  const article3 = await prisma.article.upsert({
    where: { id: 3 },
    update: { authorId: userAdmin.id },
    create: {
      title: 'Article 3',
      description: 'Article 3 description',
      body: 'Article 3 body',
      isPublished: false,
      authorId: userAdmin.id,
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
