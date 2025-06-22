const reviewModel=require('../model/review');
const reviewRes=(review,messageText)=>({
    userId:review.userId,
    productId:review.productId,
    rating:review.rating,
    coment:review.comment
})
const createReview = async (req,res)=>{
    try{


    }
}
//Todo:Build the response structure
//Todo:Build Controller completely
