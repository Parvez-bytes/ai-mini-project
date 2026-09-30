import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createHistory,
  deleteHistory,
  getHistory,
  getHistoryById
} from '../controllers/historyController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateMiddleware.js';

const router = Router();

const idValidation = [
  param('id').isMongoId().withMessage('History ID is invalid.')
];

const createValidation = [
  body('assessment').optional().isMongoId().withMessage('Assessment ID is invalid.'),
  body('bmi').optional().isFloat({ min: 0 }).withMessage('BMI must be a non-negative number.'),
  body('sleepHours').optional().isFloat({ min: 0, max: 24 }).withMessage('Sleep hours must be between 0 and 24.'),
  body('physicalActivity').optional().isFloat({ min: 0, max: 1440 }).withMessage('Physical activity must be between 0 and 1440 minutes.'),
  body('waterIntake').optional().isFloat({ min: 0, max: 20 }).withMessage('Water intake must be between 0 and 20 liters.'),
  body('screenTime').optional().isFloat({ min: 0, max: 24 }).withMessage('Screen time must be between 0 and 24 hours.'),
  body('wellnessScore').optional().isFloat({ min: 0, max: 100 }).withMessage('Wellness score must be between 0 and 100.'),
  body('profileGroup').optional().trim().isLength({ max: 100 }).withMessage('Profile group is too long.'),
  body('recordedAt').optional().isISO8601().withMessage('Recorded date is invalid.')
];

router.get('/', authMiddleware, getHistory);
router.get('/:id', authMiddleware, idValidation, validateRequest, getHistoryById);
router.post('/', authMiddleware, createValidation, validateRequest, createHistory);
router.delete('/:id', authMiddleware, idValidation, validateRequest, deleteHistory);

export default router;
