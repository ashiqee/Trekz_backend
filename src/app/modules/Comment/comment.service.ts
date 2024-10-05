
import { JwtPayload } from "jsonwebtoken";
import { Comment, Post } from "../Post/post.model";



const createComment = async (userId: JwtPayload, postId: string, commentText: string) => {
 
 
  
  try{
    const newComment = new Comment({
      user: userId,
      post: postId,
      commentText,
    });
  

    const res= await newComment.save()

   
       await Post.findByIdAndUpdate(postId,{
            $push: {comments: res }
        },
        {new:true}
      ).populate('comments');

    
        
    

    return res;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   }catch(err:any){
    throw new Error(err)
   }

}



const editComment = async (commentId: string, userId: string, commentText: string) => {
   
  
  
  const comment = await Comment.findById(commentId);
  
    if (!comment) {
      throw new Error('Comment not found');
    }
  
    // Check if the user 
    if (comment.user.toString() !== userId) {
      throw new Error('Not authorized to edit this comment');
    }
  
    comment.commentText = commentText;
    await comment.save();
  
    return comment;
  };


  const deleteComment = async (commentId: string) => {

    
    const comment = await Comment.findById(commentId);

   
    
    if(!comment){
        throw new Error("Comment not found");
    }


     await Post.findByIdAndUpdate(
      comment.post,
      { $pull: { comments: { _id: commentId } } }, 
      { new: true } 
    )


    const result = await Comment.findByIdAndDelete(commentId);
  
    let message

    if(result){
        message ="Comment deleted succesfully"
    }

   
    return { message };
  };



  const replyToComment = async (commentId: string, userId: JwtPayload, replyText: string) => {
    const comment = await Comment.findById(commentId);
  
    if (!comment) {
      throw new Error('Comment not found');
    }

    if (!comment.replies) {
      comment.replies = [];
    }
    const reply = { userId, replyText };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    comment.replies.push(reply as any);

    await comment.save();
  
    return comment; 
  };




export const commentServices = {
    createComment,
    editComment,
    deleteComment,
    replyToComment
}