import { catchAsync } from "../../utils/catchAsync";
import { payServices } from "./payment.service";


const confirmationController = catchAsync(async (req,res)=>{
  
    
    const {transactionId} = req.query;

    const result = await payServices.confirmationService(transactionId as string);


    res.send(result)
})


export const paymentController ={
    confirmationController
}