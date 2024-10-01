



import { User } from "../User/user.model"



//add follows
const addFollowToDB = async(id:string,playLoad:{followId:string})=>{


  
    // add follow
    const user = await User.findByIdAndUpdate(id,
      {$push:{follow: playLoad.followId}}
      ,{new:true}
    )
  
    // add Followers
    const followUser = await User.findByIdAndUpdate(playLoad.followId,
      {$push:{followers:id}}
      ,{new:true}
    )
  
    return { user, followUser}
  
  }






  
  export const FollewerServices = {
    addFollowToDB
  }