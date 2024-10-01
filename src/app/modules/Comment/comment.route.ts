import express from 'express';

import auth from '../../middlewares/auth';

import { USER_ROLE } from '../User/user.constant';
import { CommentControllers } from './comment.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.USER), CommentControllers.createCommentIntoDb);

export const CommentsRoutes = router;
