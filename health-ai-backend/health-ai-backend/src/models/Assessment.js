import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    profileSnapshot: {
      type: new mongoose.Schema(
        {
          age: Number,
          height: Number,
          weight: Number,
          bmi: Number,
          sleepHours: Number,
          physicalActivity: Number,
          waterIntake: Number,
          screenTime: Number,
          smoking: String,
          alcohol: String,
          bloodPressure: String,
          bloodGlucose: Number,
          existingConditions: String,
          healthConcerns: String
        },
        { _id: false }
      ),
      required: true
    },
    responses: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    analysisStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

const Assessment = mongoose.model('Assessment', assessmentSchema);

export default Assessment;
