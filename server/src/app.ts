import cors from 'cors';
import env from 'dotenv';
import express from 'express';

import prisma from '@/db/prisma';
import routes from '@/routes';

env.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', routes);
app.use('/uploads', express.static('uploads'));

const main = async (): Promise<void> => {
  app.listen(PORT, () => {
    console.log(`[server] server has been start on port ${PORT}`);
  });
};

main()
  .catch((error) => {
    if (error instanceof Error) console.error(`[server] error: ${error.message}`);
    else console.error(`[server] error connection: ${error}`);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default app;
