import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema(
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
    category: {
      type: String,
      enum: ['sleep', 'physical_activity', 'hydration', 'nutrition', 'screen_time', 'routine'],
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    reason: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    action: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    source: {
      type: String,
      enum: ['rule', 'ml', 'search', 'assistant'],
      required: true,
      default: 'rule'
    }
  },
  { timestamps: true }
);

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;
