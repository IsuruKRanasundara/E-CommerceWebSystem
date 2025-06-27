const reviewModel=require('../model/review');
const reviewRes=(review,messageText)=>({
    userId:review.userId,
    productId:review.productId,
    rating:review.rating,
    coment:review.comment
})
const createReview = async (req,res)=>{
    try {
        const userId = req.user._id;
        const {productId, rating, coment} = req.body;
        const newReview = new reviewModel({
            userId,
            productId,
            rating,
            coment
        });
        await newReview.save();
        res.status(201).json(reviewRes(newReview, 'Review Stored Successfully'));

    }catch (e) {
        console.error('Server Error!',e);
        res.status(501).json({message:'Server Error!'});
    }


}













const getAllReviewById=async (req,res)=>{
    try{
        const productId=req.params.productId;
        const reviews = await reviewModel.findById({_id:productId});
        if(!reviews || reviews.length === 0) return res.status(401).json({message:'Not Found Reviews!'});
        res.status(201).json(reviews.map(review =>
          reviewRes(review,'Review')
        ));

    }catch (e) {
        console.error("Server Error!",e);
        res.status(501).json({message:'Server Error!'});

    }
}
const updateReview=async (req,res)=>{
    try{
        const {
            productId,
            rating,
            coment
        } = req.body;
        const userId=req.user._id;
        const newReview=await reviewModel.findById({userId:userId , productId:productId});
        if(!newReview || newReview.length === 0){
            return res.status(401).json({message:'Not Found!'});
        }
        res.status(201).json(reviewRes(newReview,'Review'));
    }catch (e) {
        console.error('Server Error!',e);
        res.status(401).json({message:'Server Not Running!'});

    }
}
