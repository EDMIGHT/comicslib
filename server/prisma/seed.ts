import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  await Promise.all([createComicAttributes()]);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function createComicAttributes(): Promise<{
  statusesCounts: Prisma.BatchPayload;
  genresCounts: Prisma.BatchPayload;
  themesCounts: Prisma.BatchPayload;
}> {
  const statusesCounts = await prisma.status.createMany({
    data: [
      { name: 'cancelled' },
      { name: 'completed' },
      { name: 'hiatus' },
      { name: 'ongoing' },
    ],
    skipDuplicates: true,
  });
  const genresCounts = await prisma.genre.createMany({
    data: [
      { title: 'Adventure' },
      { title: 'Comedy' },
      { title: 'Crime' },
      { title: 'Drama' },
      { title: 'Fantasy' },
      { title: 'Historical' },
      { title: 'Horror' },
      { title: 'Isekai' },
      { title: 'Mecha' },
      { title: 'Medical' },
      { title: 'Mystery' },
      { title: 'Philosophical' },
      { title: 'Psychological' },
      { title: 'Romance' },
      { title: 'Sports' },
      { title: 'Superhero' },
      { title: 'Thriller' },
      { title: 'Tragedy' },
    ],
    skipDuplicates: true,
  });
  const themesCounts = await prisma.theme.createMany({
    data: [
      { title: 'Aliens' },
      { title: 'Animals' },
      { title: 'Cooking' },
      { title: 'Demons' },
      { title: 'Ghosts' },
      { title: 'Mafia' },
      { title: 'Magic' },
      { title: 'Military' },
      { title: 'Monsters' },
      { title: 'Music' },
      { title: 'Ninja' },
      { title: 'Office Workers' },
      { title: 'Police' },
      { title: 'Post-Apocalyptic' },
      { title: 'Reincarnation' },
      { title: 'Samurai' },
      { title: 'School Life' },
      { title: 'Survival' },
      { title: 'Time Travel' },
      { title: 'Traditional Games' },
      { title: 'Vampires' },
      { title: 'Video Games' },
      { title: 'Virtual Reality' },
      { title: 'Zombies' },
    ],
    skipDuplicates: true,
  });

  return {
    statusesCounts,
    genresCounts,
    themesCounts,
  };
}
