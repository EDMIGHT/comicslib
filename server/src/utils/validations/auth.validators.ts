import { check } from 'express-validator';

import { LIMITS } from '@/configs/general.configs';
import prisma from '@/db/prisma';

const userSchema = prisma.user.fields;

export const signUpValidators = [
  check(userSchema.login.name)
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum login length is 2 characters')
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum login length is ${LIMITS.maxStringLength} characters`),
  check(userSchema.password.name)
    .trim()
    .isLength({ min: 5 })
    .withMessage('The minimum password length is 5 characters')
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum password length is ${LIMITS.maxStringLength} characters`),
];

export const signInValidators = [
  check(userSchema.login.name)
    .trim()
    .isLength({ min: 2 })
    .withMessage('The minimum login length is 2 characters')
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum login length is ${LIMITS.maxStringLength} characters`),
  check(userSchema.password.name)
    .trim()
    .isLength({ min: 5 })
    .withMessage('The minimum password length is 5 characters')
    .isLength({ max: LIMITS.maxStringLength })
    .withMessage(`The maximum password length is ${LIMITS.maxStringLength} characters`),
];
