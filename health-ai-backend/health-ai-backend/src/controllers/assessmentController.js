import Assessment from '../models/Assessment.js';
import HealthProfile from '../models/HealthProfile.js';

const buildProfileSnapshot = (profile) => ({
  age: profile.age,
  height: profile.height,
  weight: profile.weight,
  bmi: profile.bmi,
  sleepHours: profile.sleepHours,
  physicalActivity: profile.physicalActivity,
  waterIntake: profile.waterIntake,
  screenTime: profile.screenTime,
  smoking: profile.smoking,
  alcohol: profile.alcohol,
  bloodPressure: profile.bloodPressure,
  bloodGlucose: profile.bloodGlucose,
  existingConditions: profile.existingConditions,
  healthConcerns: profile.healthConcerns
});

export const createAssessment = async (req, res, next) => {
  try {
    const profile = await HealthProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(400).json({
        success: false,
        message: 'Create a health profile before submitting an assessment.'
      });
    }

    const assessment = await Assessment.create({
      user: req.user._id,
      profileSnapshot: buildProfileSnapshot(profile),
      responses: req.body.responses || {},
      analysisStatus: 'pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Assessment created. Analysis is pending for the future AI service.',
      data: { assessment }
    });
  } catch (error) {
    next(error);
  }
};

export const getAssessments = async (req, res, next) => {
  try {
    const assessments = await Assessment.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Assessments fetched successfully.',
      data: { assessments }
    });
  } catch (error) {
    next(error);
  }
};

export const getAssessmentById = async (req, res, next) => {
  try {
    const assessment = await Assessment.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Assessment fetched successfully.',
      data: { assessment }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAssessment = async (req, res, next) => {
  try {
    const assessment = await Assessment.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Assessment deleted successfully.',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
