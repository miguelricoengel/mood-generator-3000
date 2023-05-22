// models/User.model.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    vibes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vibe'
      }
    ]
    //linkear vibes xej: https://github.com/ironhack-labs/lesson-crud-with-populate/blob/full-crud-w-populate/models/User.model.js
    // crear empty array donde almacenar fav vibes.
  },
  {
    timestamps: true
  }
);


module.exports = model('User', userSchema);
