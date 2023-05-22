const { Schema, model } = require('mongoose');

const vibeSchema = new Schema(
    {
      atmos: {
        type: String,
        trim: true,
        required: true,
      },
      sounds: {
        type: String,
        trim: true,
        required: true,
      },
      visuals: {
        type: String,
        trim: true,
        required: true,
    },
      title: {
        type: String,
        trim: true,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    },
    {
      timestamps: true
    }
);

  module.exports = model('Vibe', vibeSchema);