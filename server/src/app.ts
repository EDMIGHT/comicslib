import cookieParser from 'cookie-parser';
import cors from 'cors';
import env from 'dotenv';
import express from 'express';

import prisma from '@/db/prisma';
import routes from '@/routes';

env.config();

const PORT = process.env.PORT || 3001;
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN!;

const app = express();

app.use(express.json({ limit: '110mb' }));
app.use(
  cors({
    origin: CLIENT_DOMAIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use('/api', routes);

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
