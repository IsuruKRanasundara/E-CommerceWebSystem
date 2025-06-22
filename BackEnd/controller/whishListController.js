const wishListModel= require('../model/whishList');
const wishListRes=(wishList,messageText)=> ({
    message:messageText,
    wishList:{
        userId:wishList.userId,
        products:wishList.products
    }
}
);
const createWishList=async (req,res)=>{
    try{

        const userId = req.user._id;
        const products = req.body;
        const newWishList = new wishListModel({
            userId,
            products
        });
        if(!newWishList){
            return res.status(404).json({message: 'Not Created Successfully'});
        }
        await newWishList.save();
        res.status(200).json(wishListRes(newWishList,'Created Successfully'));

    }catch (e) {
        console.error('Error Occurred!',e);
        res.status(501).json({message: 'Server Error!'},e);
//Creating wish List is complete
    }
}




const getWishList=async (req,res)=>{

    try{
        const userId = req.user._id;
        const wishListItems = await wishListModel.findById(userId);
        if(!wishListItems){
            return res.status(404).json({message:'Not Found!'});
        }
        res.status(201).json(wishListRes(wishListItems,'WishList'));

    }catch (e) {
        console.error('Error Occurred!');
        res.status(501).json({message: 'Server Error!'},e);
    }
}
const updateWishList=async (req,res) => {
    try {
        const userId = req.user._id;
        const {Id, items} = req.body;
        const newWishList = await wishListModel.findByIdAndUpdate(Id, {products: items}, {new: true});
        res.status(201).json(wishListRes(newWishList, 'Response'));

    } catch (e) {
        console.error('Updating Error!', e);
        res.status(501).json({message: 'Server Error!'}, e);
    }
}



module.exports={

    createWishList,
    getWishList,
    updateWishList
}
