const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Defensive check and clearer error if something's wrong
if (!profileController || typeof profileController.getProfile !== 'function' || typeof profileController.updateProfile !== 'function') {
  console.error('profileController is invalid or missing handlers:', {
    profileController,
    getProfileType: profileController && typeof profileController.getProfile,
    updateProfileType: profileController && typeof profileController.updateProfile
  });
  // Throw early so the stack shows a clear message during server start
  throw new Error('profileController.getProfile/updateProfile must be functions. Check backend/controllers/profileController.js');
}

// GET /api/profile/:email
router.get('/:email', profileController.getProfile);

// PUT /api/profile/:email
router.put('/:email', express.json(), profileController.updateProfile);

module.exports = router;