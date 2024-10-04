import { join } from "path";
import { User } from "../User/user.model";
import { verifyPayment } from "./payment.utils"
import { readFileSync } from "fs";
import { PremiumProfile } from "../Profile/profile.model";


const confirmationService = async (transactionId:string)=>{
    const verifyResponse = await verifyPayment(transactionId);


    let result;
    let message= '';

    if(verifyResponse && verifyResponse.pay_status =='Successful'){
        result = await PremiumProfile.findByIdAndUpdate({transactionId},{
            paymentStatus: "Paid"
        })
        const userId = result?.user;

        if(result){
            await User.findByIdAndUpdate({_id:userId},{
                isVerified:true
            })
        }

        message=`${transactionId}`
    }else{
        message="Payment Failed!"
    }
    const filePath = join(__dirname, '../../../views/onfirmation.html');
    let template = readFileSync(filePath, 'utf-8')

    template = template.replace('{{message}}', message)

    return template;
}

export const payServices = { confirmationService}