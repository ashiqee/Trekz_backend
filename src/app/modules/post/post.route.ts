import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
import { PostControllers } from './post.controller';
import { multerUpload } from '../../config/multer.config';




const router = express.Router();


router.post(
  '/create-post',
  multerUpload.array('images',5),
  auth(USER_ROLE.USER,USER_ROLE.ADMIN),
  
  PostControllers.createPostIntoDB
);

router.patch(
  '/update-post/:id',
  multerUpload.array('images',5),
  auth(USER_ROLE.USER,USER_ROLE.ADMIN),
  
  PostControllers.updateAPost
);


router.delete('/delete/:id',auth(USER_ROLE.USER,USER_ROLE.ADMIN) ,
 PostControllers.deleteAPosts);


router.get('/', PostControllers.getAllPosts);

router.get('/search', PostControllers.getAllSearchPosts);

router.get('/:id', auth(USER_ROLE.USER,USER_ROLE.ADMIN), PostControllers.getAPosts);

router.get('/my/:id', auth(USER_ROLE.USER,USER_ROLE.ADMIN), PostControllers.getMyPosts);


router.put('/upvote', auth(USER_ROLE.USER) , PostControllers.upvotePostInPost)
router.put('/downvote', auth(USER_ROLE.USER) , PostControllers.downVotesPostInPost)

export const PostRoutes = router;