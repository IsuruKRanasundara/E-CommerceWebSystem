const paymentModel=require('../model/payment');

const paymentRes=(payment,messageText)=>({
    message:messageText,
    payment:{
        _id:payment._id,
        userId:payment.userId,
        orderId:payment.orderId,
        amount:payment.amount,
        paymentMethod:payment.paymentMethod,

    }
});
const createPayment=async (req, res) => {
    try {
        const {orderId, amount, paymentMethod} = req.body;
        const userId = req.user._id;
        const paymentcreatedAt = new Date();
        const newPayment = new paymentModel({
            userId,
            orderId,
            amount,
            paymentMethod,
            paymentcreatedAt,
        });
        await newPayment.save();
        res.status(200).json(paymentRes(newPayment, 'Payment is creating'));
    } catch (e) {
        console.error("Error Creating Payment", e);
        res.status(500).json({message: 'Server Error'});
    }
}



const getPayment=(req,res)=>{
    try{
        const paymentId=req.params.id
        const payment=paymentModel.findById(paymentId);
        if(!payment){
            return res.status(404).json({message: 'Not Founded'});

        }
        res.status(500).json(paymentRes(payment,'Payment'));

    }catch (e) {
        console.error("Server Error!",e);
        res.status(400).json({message: 'Server Error!'});
    }
}
const getAllPayment = (req,res) => {
    try{
        const payments=paymentModel.find();
        if(!payments){
            return res.status(404).json({message: 'An Error!'});
        }
        res.status(200).json(
            payments.map(payment=> {
              paymentRes(payment,'payment');
            })
        );
    }catch (e) {
        console.error("Server Error!",e);
        res.status(400).json({message: 'Server Error!'});

    }
}
module.exports={
    createPayment,
    getPayment,
    getAllPayment,

}
