const mongoose = require('mongoose');

const addOnSchema = new mongoose.Schema({
  url: { type: String, required: true },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  }
});

const paperSchema = new mongoose.Schema({
  texture: { type: String, required: true },
  customStyle: { type: String }
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