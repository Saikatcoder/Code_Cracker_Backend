import express from 'express';
import {
  check,
  login,
  logout,
  registerUser,
} from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const authRotes = express.Router();

authRotes.post('/register', registerUser);

authRotes.post('/login', login);

authRotes.post('/logout',authMiddleware, logout);

authRotes.get('/check',authMiddleware, check);

export default authRotes;
