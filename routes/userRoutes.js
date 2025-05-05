const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createUser ,loginUser,getAllUsers,updateUser,getUsersById,deleteUser} = require('../controller/userController');
const { allowOnlyAdmin } = require('../middleware/roleMiddleware');
// Public routes
router.post('/register', createUser);
router.post('/login', loginUser);

// Protected route
router.get('/profile/', allowOnlyAdmin, protect, getAllUsers);
router.get('/profile/:id', protect, getUsersById);
router.delete('/profile/:id', allowOnlyAdmin, protect, deleteUser);
router.put('/profile/:id', protect, updateUser);
router.put('/profile/:id', protect, updateUser);
module.exports = router;
