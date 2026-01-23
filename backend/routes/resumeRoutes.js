const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const resumeController = require('../controllers/resumeController');

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/analyze', upload.single('resume'), resumeController.analyzeResume);
router.post('/upload', upload.single('resume'), resumeController.uploadResume);

module.exports = router;
