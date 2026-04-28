import express from 'express';
import { celebrate } from 'celebrate';

import {
  register,
  login,
  refresh,
  logout,
} from '../controllers/authController.js';

import {
  registerSchema,
  loginSchema,
} from '../validations/authValidation.js';

const router = express.Router();

router.post('/register', celebrate(registerSchema), register);
router.post('/login', celebrate(loginSchema), login);

router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
