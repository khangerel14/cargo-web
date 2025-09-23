// src/routers/auth.router.ts
import express from 'express';
import { resetPassword } from '../controllers/auth/resetPassword';

const router = express.Router();

// Routes
router.post('/reset-password', resetPassword);

export default router;
