const Letter = require('../models/Letter');
const generateShareableLink = require('../utils/generateShareableLink');

// Create a new letter
exports.createLetter = async (req, res) => {
    try {
      const { title, content } = req.body;
      const shareableLink = generateShareableLink();
      const letter = new Letter({
        user_id: req.user.id,
        title,
        content,
        shareable_link: shareableLink
      });
      await letter.save();
      res.status(201).json(letter);
    } catch (err) {
      res.status(500).json({ message: 'Error creating letter', error: err.message });
    }
  };

// Update a letter
exports.updateLetter = async (req, res) => {
  try {
    const { content } = req.body;
    const letter = await Letter.findByIdAndUpdate(
      req.params.letter_id,
      { content, updated_at: Date.now() },
      { new: true }
    );
    res.json({ message: 'Letter updated successfully', letter });
  } catch (err) {
    res.status(500).json({ message: 'Error updating letter', error: err.message });
  }
};

// Fetch a letter
exports.getLetter = async (req, res) => {
  try {
    const letter = await Letter.findById(req.params.letter_id);
    res.json(letter);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching letter', error: err.message });
  }
};

// Fetch all letters for the user
exports.getAllLetters = async (req, res) => {
  try {
    const letters = await Letter.find({ user_id: req.user.id });
    res.json(letters);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching letters', error: err.message });
  }
};

// Delete a letter
exports.deleteLetter = async (req, res) => {
  try {
    await Letter.findByIdAndDelete(req.params.letter_id);
    res.json({ message: 'Letter deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting letter', error: err.message });
  }
};

// Fetch a letter by its shareable link
exports.getLetterByShareableLink = async (req, res) => {
    try {
      const letter = await Letter.findOne({ shareable_link: req.params.shareable_link }).select('_id title content user_id');
      if (!letter) {
        return res.status(404).json({ message: 'Letter not found' });
      }
  
      const user = await User.findById(letter.user_id).select('name profile_picture');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({
        _id: letter._id,
        title: letter.title,
        content: letter.content,
        name: user.name,
        profile_picture: user.profile_picture
      });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching letter', error: err.message });
    }
  };