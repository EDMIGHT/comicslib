import express from 'express';

import { createStatus, getAllStatuses, getStatus } from '@/controllers/status.controllers';
import { authentication, validation } from '@/middleware';
import { createStatusValidators } from '@/utils/validations/status.validators';

const router = express.Router({ mergeParams: true });

router.get('/', getAllStatuses);
router.get('/:name', getStatus);

router.post('/', authentication, createStatusValidators, validation, createStatus);

export default router;
