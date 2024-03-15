import express from 'express';
import authController from '../controller/authController.js';

const router = express.Router();


router.post("/auth/login", authController.login)


export default router;