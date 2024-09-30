import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
import { PostControllers } from './post.controller';



const router = express.Router();


router.post(
  '/create-post',
  auth(USER_ROLE.USER,USER_ROLE.ADMIN),
  
  PostControllers.createPostIntoDB
);
router.get('/', PostControllers.getAllPosts);

// router.get('/:id', UserControllers.getSingleUser);




export const PostRoutes = router;