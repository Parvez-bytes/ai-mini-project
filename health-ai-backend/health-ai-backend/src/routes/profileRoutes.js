import { Router } from 'express';
import { body } from 'express-validator';
import {
  createProfile,
  deleteProfile,
  getProfile,
  updateProfile
} from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateMiddleware.js';

const router = Router();

const profileValidation = [
  body('age').isFloat({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120.'),
  body('height').isFloat({ min: 50, max: 250 }).withMessage('Height must be between 50 and 250 cm.'),
  body('weight').isFloat({ min: 1, max: 500 }).withMessage('Weight must be between 1 and 500 kg.'),
  body('sleepHours').isFloat({ min: 0, max: 24 }).withMessage('Sleep hours must be between 0 and 24.'),
  body('physicalActivity').isFloat({ min: 0, max: 1440 }).withMessage('Physical activity must be between 0 and 1440 minutes.'),
  body('waterIntake').isFloat({ min: 0, max: 20 }).withMessage('Water intake must be between 0 and 20 liters.'),
  body('screenTime').isFloat({ min: 0, max: 24 }).withMessage('Screen time must be between 0 and 24 hours.'),
  body('smoking').optional().isIn(['never', 'occasionally', 'regularly']).withMessage('Smoking value is invalid.'),
  body('alcohol').optional().isIn(['never', 'occasionally', 'regularly']).withMessage('Alcohol value is invalid.'),
  body('bloodPressure').optional().trim().isLength({ max: 30 }).withMessage('Blood pressure entry is too long.'),
  body('bloodGlucose').optional().isFloat({ min: 0, max: 1000 }).withMessage('Blood glucose must be a valid non-negative number.'),
  body('existingConditions').optional().trim().isLength({ max: 500 }).withMessage('Existing conditions entry is too long.'),
  body('healthConcerns').optional().trim().isLength({ max: 1000 }).withMessage('Health concerns entry is too long.')
];

// Explicit update validators keep PUT partial-update friendly.
const updateValidation = [
  body('age').optional().isFloat({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120.'),
  body('height').optional().isFloat({ min: 50, max: 250 }).withMessage('Height must be between 50 and 250 cm.'),
  body('weight').optional().isFloat({ min: 1, max: 500 }).withMessage('Weight must be between 1 and 500 kg.'),
  body('sleepHours').optional().isFloat({ min: 0, max: 24 }).withMessage('Sleep hours must be between 0 and 24.'),
  body('physicalActivity').optional().isFloat({ min: 0, max: 1440 }).withMessage('Physical activity must be between 0 and 1440 minutes.'),
  body('waterIntake').optional().isFloat({ min: 0, max: 20 }).withMessage('Water intake must be between 0 and 20 liters.'),
  body('screenTime').optional().isFloat({ min: 0, max: 24 }).withMessage('Screen time must be between 0 and 24 hours.'),
  body('smoking').optional().isIn(['never', 'occasionally', 'regularly']).withMessage('Smoking value is invalid.'),
  body('alcohol').optional().isIn(['never', 'occasionally', 'regularly']).withMessage('Alcohol value is invalid.'),
  body('bloodPressure').optional().trim().isLength({ max: 30 }).withMessage('Blood pressure entry is too long.'),
  body('bloodGlucose').optional().isFloat({ min: 0, max: 1000 }).withMessage('Blood glucose must be a valid non-negative number.'),
  body('existingConditions').optional().trim().isLength({ max: 500 }).withMessage('Existing conditions entry is too long.'),
  body('healthConcerns').optional().trim().isLength({ max: 1000 }).withMessage('Health concerns entry is too long.')
];

router.get('/', authMiddleware, getProfile);
router.post('/', authMiddleware, profileValidation, validateRequest, createProfile);
router.put('/', authMiddleware, updateValidation, validateRequest, updateProfile);
router.delete('/', authMiddleware, deleteProfile);

export default router;
