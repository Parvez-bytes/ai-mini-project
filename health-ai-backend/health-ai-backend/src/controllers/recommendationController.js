import Recommendation from '../models/Recommendation.js';
import Assessment from '../models/Assessment.js';

export const getRecommendations = async (req, res, next) => {
  try {
    const recommendations = await Recommendation.find({ user: req.user._id })
      .populate('assessment', 'analysisStatus createdAt')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Recommendations fetched successfully.',
      data: { recommendations }
    });
  } catch (error) {
    next(error);
  }
};

export const getRecommendationById = async (req, res, next) => {
  try {
    const recommendation = await Recommendation.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('assessment', 'analysisStatus createdAt');

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Recommendation fetched successfully.',
      data: { recommendation }
    });
  } catch (error) {
    next(error);
  }
};

export const createRecommendation = async (req, res, next) => {
  try {
    const { assessment } = req.body;

    if (assessment) {
      const assessmentExists = await Assessment.exists({
        _id: assessment,
        user: req.user._id
      });

      if (!assessmentExists) {
        return res.status(404).json({
          success: false,
          message: 'Assessment not found for the current user.'
        });
      }
    }

    const recommendation = await Recommendation.create({
      ...req.body,
      user: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: 'Recommendation created successfully.',
      data: { recommendation }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecommendation = async (req, res, next) => {
  try {
    const recommendation = await Recommendation.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Recommendation deleted successfully.',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
