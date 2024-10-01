import mongoose from "mongoose";
import { Comment, Post } from "../Post/post.model";



const createComment = async (userId: string, postId: string, commentText: string) => {
    const newComment = new Comment({
      user: userId,
      post: postId,
      commentText,
    });
  

    const res= await newComment.save()

    if(res){
        const postDetails = await Post.findByIdAndUpdate(postId,{
            $push: {comments: res._id }
        })
        console.log(postDetails);
        
    }

    return res;

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


  const deleteComment = async (commentId: string, userId: string) => {

    const comment = await Comment.findById(commentId);
    if(!comment){
        throw new Error("Comment not found");
    }

    if(comment.user.toString()!== userId){
        throw new Error("Not Authrized delete this comment")
    }

    const result = await Comment.findByIdAndDelete(commentId);
  
    let message

    if(result){
        message ="Comment deleted succesfully"
    }

   
    return { message };
  };



  const replyToComment = async (commentId: string, userId: string, replyText: string) => {
    const comment = await Comment.findById(commentId);
  
    if (!comment) {
      throw new Error('Comment not found');
    }
    const userObjectId = new mongoose.Types.ObjectId(userId);

    comment.replies?.push({ user: userObjectId, replyText });
    await comment.save();
  
    return comment; 
  };




export const commentServices = {
    createComment,
    editComment,
    deleteComment,
    replyToComment
}