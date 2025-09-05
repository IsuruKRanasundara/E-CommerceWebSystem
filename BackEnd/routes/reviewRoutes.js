const express=require('express');
const router=express.Router();
const {authMiddleware}=require('../middleware/authMiddleware');
const adminRoutes=require('../middleware/roleMiddleware');
const {
    createReview,
    getAllReviewById,
    updateReview
}= require('../controller/reviewController');



router.get('/:id',authMiddleware,getAllReviewById);
router.post('/:reviewDetail',authMiddleware,createReview);
router.put('/:reviewDetail',authMiddleware,updateReview);
module.exports=router;