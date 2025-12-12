const express = require('express');
const router = express.Router();
const multer = require('multer');
const resumeController = require('../controllers/resumeController');

// Multer setup
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', upload.single('resume'), resumeController.analyzeResume);

module.exports = router;
