import mongoose from 'mongoose';

const healthHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assessment'
    },
    bmi: {
      type: Number,
      min: 0
    },
    sleepHours: {
      type: Number,
      min: 0,
      max: 24
    },
    physicalActivity: {
      type: Number,
      min: 0,
      max: 1440
    },
    waterIntake: {
      type: Number,
      min: 0,
      max: 20
    },
    screenTime: {
      type: Number,
      min: 0,
      max: 24
    },
    wellnessScore: {
      type: Number,
      min: 0,
      max: 100,
      description: 'Project-defined prototype wellness indicator; not a medical score.'
    },
    profileGroup: {
      type: String,
      trim: true,
      maxlength: 100
    },
    recordedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const HealthHistory = mongoose.model('HealthHistory', healthHistorySchema);

export default HealthHistory;
