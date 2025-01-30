const mongoose = require('mongoose');

const addOnSchema = new mongoose.Schema({
  name: { type: String},
  position: {
    x: { type: Number},
    y: { type: Number}
  },
  size: {
    width: { type: Number},
    height: { type: Number}
  },
  rotation: { type: Number,},
  type: { type: String, enum: ['sticker', 'emoji'],}
});

const paperSchema = new mongoose.Schema({
  texture: { type: String, required: true },
  customStyle: {
    radius: { type: Number, required: true },
    padding: {
      top: { type: Number, required: true },
      bottom: { type: Number, required: true },
      left: { type: Number, required: true },
      right: { type: Number, required: true }
    },
    lineHeight: { type: Number, required: true }
  },
  cssStyles: {
    type: Map,
    of: String
  }
});

const letterSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  content: { type: String, required: true },
  shareable_link: { type: String, required: true, unique: true },
  frameColor: { type: String },
  paper: paperSchema,
  fontFamily: { type: String },
  addOns: [addOnSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Letter', letterSchema);