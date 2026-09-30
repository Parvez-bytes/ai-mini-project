import HealthProfile from '../models/HealthProfile.js';
import calculateBMI from '../utils/calculateBMI.js';

const profileFields = [
  'age',
  'height',
  'weight',
  'sleepHours',
  'physicalActivity',
  'waterIntake',
  'screenTime',
  'smoking',
  'alcohol',
  'bloodPressure',
  'bloodGlucose',
  'existingConditions',
  'healthConcerns'
];

const pickProfileFields = (body) => {
  const data = {};
  for (const field of profileFields) {
    if (body[field] !== undefined) {
      data[field] = body[field];
    }
  }
  return data;
};

export const getProfile = async (req, res, next) => {
  try {
    const profile = await HealthProfile.findOne({ user: req.user._id });

    return res.status(200).json({
      success: true,
      message: profile ? 'Health profile fetched successfully.' : 'Health profile not created yet.',
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};

export const createProfile = async (req, res, next) => {
  try {
    const existingProfile = await HealthProfile.findOne({ user: req.user._id });

    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message: 'Health profile already exists. Use PUT /api/profile to update it.'
      });
    }

    const data = pickProfileFields(req.body);
    data.user = req.user._id;
    data.bmi = calculateBMI(data.weight, data.height);

    const profile = await HealthProfile.create(data);

    return res.status(201).json({
      success: true,
      message: 'Health profile created successfully.',
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const profile = await HealthProfile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Health profile not found.'
      });
    }

    const updates = pickProfileFields(req.body);
    Object.assign(profile, updates);
    profile.bmi = calculateBMI(profile.weight, profile.height);

    await profile.save();

    return res.status(200).json({
      success: true,
      message: 'Health profile updated successfully.',
      data: { profile }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    const profile = await HealthProfile.findOneAndDelete({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Health profile not found.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Health profile deleted successfully.',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
