import { Router } from 'express';
import { body } from 'express-validator';
import { getCurrentUser, login, logout, signup } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateMiddleware.js';

const router = Router();

const signupValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.'),
  body('email').trim().isEmail().withMessage('Enter a valid email address.'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
  body('academicLevel').trim().isLength({ min: 2, max: 100 }).withMessage('Academic/occupation level is required.')
];

const loginValidation = [
  body('email').trim().isEmail().withMessage('Enter a valid email address.'),
  body('password').notEmpty().withMessage('Password is required.')
];

router.post('/signup', signupValidation, validateRequest, signup);
router.post('/login', loginValidation, validateRequest, login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getCurrentUser);

export default router;
