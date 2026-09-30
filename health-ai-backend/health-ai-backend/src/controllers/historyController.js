import HealthHistory from '../models/HealthHistory.js';
import Assessment from '../models/Assessment.js';

export const getHistory = async (req, res, next) => {
  try {
    const history = await HealthHistory.find({ user: req.user._id })
      .populate('assessment', 'analysisStatus createdAt')
      .sort({ recordedAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Health history fetched successfully.',
      data: { history }
    });
  } catch (error) {
    next(error);
  }
};

export const getHistoryById = async (req, res, next) => {
  try {
    const history = await HealthHistory.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('assessment', 'analysisStatus createdAt');

    if (!history) {
      return res.status(404).json({
        success: false,
        message: 'History record not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'History record fetched successfully.',
      data: { history }
    });
  } catch (error) {
    next(error);
  }
};

export const createHistory = async (req, res, next) => {
  try {
    if (req.body.assessment) {
      const assessmentExists = await Assessment.exists({
        _id: req.body.assessment,
        user: req.user._id
      });

      if (!assessmentExists) {
        return res.status(404).json({
          success: false,
          message: 'Assessment not found for the current user.'
        });
      }
    }

    const history = await HealthHistory.create({
      ...req.body,
      user: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: 'Health history record created successfully.',
      data: { history }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHistory = async (req, res, next) => {
  try {
    const history = await HealthHistory.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: 'History record not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Health history record deleted successfully.',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
