import { Request, Response } from 'express';
import Letter from '../models/Letter';
import User from '../models/User';
import generateShareableLink from '../utils/generateShareableLink';
import { AuthenticatedRequest } from '../types';

// Create a new letter
export const createLetter = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, content, frameColor, paper, fontFamily, addOns } = req.body;
    const shareableLink = generateShareableLink();
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const letter = new Letter({
      user_id: req.user.id,
      title,
      content,
      shareable_link: shareableLink,
      frameColor,
      paper,
      fontFamily,
      addOns
    });
    await letter.save();
    res.status(201).json(letter);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Error creating letter', error: error.message });
  }
};

// Update a letter
export const updateLetter = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { content, frameColor, paper, fontFamily, addOns } = req.body;
    const letter = await Letter.findByIdAndUpdate(
      req.params.letter_id,
      { content, frameColor, paper, fontFamily, addOns, updatedAt: Date.now() },
      { new: true }
    );
    res.json({ message: 'Letter updated successfully', letter });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Error updating letter', error: error.message });
  }
};

// Fetch a letter
export const getLetter = async (req: Request, res: Response) => {
  try {
    const letter = await Letter.findById(req.params.letter_id);
    res.json(letter);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Error fetching letter', error: error.message });
  }
};

// Fetch all letters for the user
export const getAllLetters = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const letters = await Letter.find({ user_id: req.user.id });
    res.json(letters);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Error fetching letters', error: error.message });
  }
};

// Delete a letter
export const deleteLetter = async (req: Request, res: Response) => {
  try {
    await Letter.findByIdAndDelete(req.params.letter_id);
    res.json({ message: 'Letter deleted successfully' });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Error deleting letter', error: error.message });
  }
};

// Fetch a letter by its shareable link
export const getLetterByShareableLink = async (req: Request, res: Response) => {
  try {
    const letter = await Letter.findOne({ shareable_link: req.params.shareable_link }).select('_id title content user_id frameColor paper fontFamily addOns');
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
      frameColor: letter.frameColor,
      paper: letter.paper,
      fontFamily: letter.fontFamily,
      addOns: letter.addOns,
      name: user.name,
      profile_picture: user.profile_picture
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: 'Error fetching letter', error: error.message });
  }
};