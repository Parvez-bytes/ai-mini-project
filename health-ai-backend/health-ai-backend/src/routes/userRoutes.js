import { Router } from 'express';
import { body } from 'express-validator';
import { getMe, updateMe } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateMiddleware.js';

const router = Router();

const updateValidation = [
  body('name').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.'),
  body('academicLevel').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Academic/occupation level must be between 2 and 100 characters.')
];

router.get('/me', authMiddleware, getMe);
router.put('/me', authMiddleware, updateValidation, validateRequest, updateMe);

export default router;
