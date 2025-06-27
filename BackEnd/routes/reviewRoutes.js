const express=require('express');
const router=express.Router();
const protectedRoute=require('../middleware/authMiddleware');
const adminRoutes=require('../middleware/roleMiddleware');
const {
    createReview,
    getAllReviewById,
    updateReview
}= require('../controller/reviewController');



router.get('/:id',protectedRoute,getAllReviewById);
router.post('/:reviewDetail',protectedRoute,createReview);
router.put('/:reviewDetail',protectedRoute,updateReview);
module.exports=router;
