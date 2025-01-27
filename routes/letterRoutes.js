const express = require('express');
const letterController = require('../controllers/letterController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes with authentication middleware except the public route
router.use('/letters', authMiddleware);

// Letter management routes
router.post('/letters', letterController.createLetter);
router.put('/letters/:letter_id', letterController.updateLetter);
router.get('/letters/:letter_id', letterController.getLetter);
router.get('/letters', letterController.getAllLetters);
router.delete('/letters/:letter_id', letterController.deleteLetter);

// Public route to fetch a letter by its shareable link
router.get('/letters/share/:shareable_link', letterController.getLetterByShareableLink);

module.exports = router;