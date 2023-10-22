import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';

import { LIMITS } from '@/configs/general.configs';
import prisma from '@/db/prisma';
import routes from '@/routes';

env.config();

const PORT = process.env.PORT || 3001;
const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN!;
const NODE_ENV = process.env.NODE_ENV;
const VERSION = process.env.npm_package_version;
const DESCRIPTION = process.env.npm_package_description;

const app = express();

app.use(express.json({ limit: '110mb' }));
app.use(
  cors({
    origin: CLIENT_DOMAIN,
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: LIMITS.maxRequestPerWindow, // per 15 minutes
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  })
);
app.use('/api', routes);

app.get('/', (_, res) => {
  res.send({
    mode: NODE_ENV,
    version: VERSION,
    description: DESCRIPTION,
  });
});

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
