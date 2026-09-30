import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createAssessment,
  deleteAssessment,
  getAssessmentById,
  getAssessments
} from '../controllers/assessmentController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateMiddleware.js';

const router = Router();

const idValidation = [
  param('id').isMongoId().withMessage('Assessment ID is invalid.')
];

const createValidation = [
  body('responses').optional().isObject().withMessage('Responses must be an object.')
];

router.post('/', authMiddleware, createValidation, validateRequest, createAssessment);
router.get('/', authMiddleware, getAssessments);
router.get('/:id', authMiddleware, idValidation, validateRequest, getAssessmentById);
router.delete('/:id', authMiddleware, idValidation, validateRequest, deleteAssessment);

export default router;
