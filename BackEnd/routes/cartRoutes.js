const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { getAllUsers, updateUser, getUserById, deleteUser } = require('../controller/userController');
const { allowOnlyAdmin } = require('../middleware/roleMiddleware');

// ====================
// USER MANAGEMENT ROUTES (All require authentication)
// ====================

// Admin only - Get all users
router.get('/', allowOnlyAdmin, authMiddleware, getAllUsers);

// Get user profile by ID
router.get('/:id', authMiddleware, getUserById);

// Update user profile
router.put('/:id', authMiddleware, updateUser);

// Admin only - Delete user
router.delete('/:id', allowOnlyAdmin, authMiddleware, deleteUser);

module.exports = router;