const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createUser ,loginUser,getAllUsers,updateUser,getUsersById,deleteUser} = require('../controller/userController');
const { allowOnlyAdmin } = require('../middleware/roleMiddleware');
// Public routes
router.post('/register', createUser);
router.post('/login', loginUser, passport.authenticate('local', { 
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));


// Protected route
router.get('/login', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'User is authenticated', user: req.user });
});
router.get('/profile/', allowOnlyAdmin, protect, getAllUsers);
router.get('/profile/:id', protect, getUsersById);
router.delete('/profile/:id', allowOnlyAdmin, protect, deleteUser);
router.put('/profile/:id', protect, updateUser);
router.put('/profile/:id', protect, updateUser);

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'User is not authenticated' });
};

module.exports = router;
