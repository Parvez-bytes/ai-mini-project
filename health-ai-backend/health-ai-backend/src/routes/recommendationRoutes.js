import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createRecommendation,
  deleteRecommendation,
  getRecommendationById,
  getRecommendations
} from '../controllers/recommendationController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateMiddleware.js';

const router = Router();

const categoryValues = ['sleep', 'physical_activity', 'hydration', 'nutrition', 'screen_time', 'routine'];
const priorityValues = ['low', 'medium', 'high'];
const sourceValues = ['rule', 'ml', 'search', 'assistant'];

const idValidation = [
  param('id').isMongoId().withMessage('Recommendation ID is invalid.')
];

const createValidation = [
  body('assessment').optional().isMongoId().withMessage('Assessment ID is invalid.'),
  body('category').isIn(categoryValues).withMessage('Recommendation category is invalid.'),
  body('title').trim().isLength({ min: 2, max: 200 }).withMessage('Recommendation title is required.'),
  body('reason').trim().isLength({ min: 2, max: 1000 }).withMessage('Recommendation reason is required.'),
  body('action').trim().isLength({ min: 2, max: 1000 }).withMessage('Recommendation action is required.'),
  body('priority').isIn(priorityValues).withMessage('Recommendation priority is invalid.'),
  body('source').optional().isIn(sourceValues).withMessage('Recommendation source is invalid.')
];

router.get('/', authMiddleware, getRecommendations);
router.get('/:id', authMiddleware, idValidation, validateRequest, getRecommendationById);
router.post('/', authMiddleware, createValidation, validateRequest, createRecommendation);
router.delete('/:id', authMiddleware, idValidation, validateRequest, deleteRecommendation);

export default router;
