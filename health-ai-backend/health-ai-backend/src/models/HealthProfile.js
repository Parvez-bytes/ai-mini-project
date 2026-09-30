import mongoose from 'mongoose';

const healthProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120
    },
    height: {
      type: Number,
      required: true,
      min: 50,
      max: 250
    },
    weight: {
      type: Number,
      required: true,
      min: 1,
      max: 500
    },
    sleepHours: {
      type: Number,
      required: true,
      min: 0,
      max: 24
    },
    physicalActivity: {
      type: Number,
      required: true,
      min: 0,
      max: 1440
    },
    waterIntake: {
      type: Number,
      required: true,
      min: 0,
      max: 20
    },
    screenTime: {
      type: Number,
      required: true,
      min: 0,
      max: 24
    },
    smoking: {
      type: String,
      enum: ['never', 'occasionally', 'regularly'],
      default: 'never'
    },
    alcohol: {
      type: String,
      enum: ['never', 'occasionally', 'regularly'],
      default: 'never'
    },
    bloodPressure: {
      type: String,
      trim: true,
      maxlength: 30
    },
    bloodGlucose: {
      type: Number,
      min: 0,
      max: 1000
    },
    existingConditions: {
      type: String,
      trim: true,
      maxlength: 500
    },
    healthConcerns: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    bmi: {
      type: Number,
      min: 0
    }
  },
  { timestamps: true }
);

const HealthProfile = mongoose.model('HealthProfile', healthProfileSchema);

export default HealthProfile;
