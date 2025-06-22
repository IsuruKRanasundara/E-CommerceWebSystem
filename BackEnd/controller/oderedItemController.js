const orderItemModel =require('../model/orderedItem');
const orderItemRes=(orderedItem,messageText)=>({
    message:messageText,
    orderedItems:{
        userId:orderedItem.userId,
        orderItems:orderedItem.orderItems,
        totalPayment:orderedItem.totalPayment,
        status:orderedItem.status,
        adress:orderedItem.adress,
    }
});
const createOrderedItems=async (req,res)=> {

   try {
       const userId = req.user._id;
       const {orderItems,status,adress,createdAt}=req.body;
       let sumValue =0;
       const totalPayment= req.body.orderedItems.map((items) => sumValue += items.price);
       const newOrderedItems = new orderItemModel({
           userId,
           orderItems,
           totalPayment,
           status,
           adress,
           createdAt,
       });

       await newOrderedItems.save();
       res.status(201).json(orderItemRes(newOrderedItems,'OrderItem created Successfully'))
   }catch (e) {
        console.error('Error Creating Ordered Items!',e);
        res.status(500).json({message: 'Server Error!'});

   }
}

const getOrderedItemsById=async (req,res)=> {
        try {

            const orderedItems = await orderItemModel.findById(req.params.Id);
            if (!orderedItems) {
                return res.status(404).json({message: 'ItemsList Not Found!'});
            }

            res.status(201).json(orderItemRes(orderedItems, 'Items'));
        } catch (e) {
            console.error('Error Geting Items!',e);
            res.status(500).json({message:'Server Error!',e});
        }

}


module.exports={
    createOrderedItems,
    getOrderedItemsById
}




