
import express from 'express';

import auth from '../../middlewares/auth';


import { USER_ROLE } from '../User/user.constant';
import { FollewerControllers } from './follow.controller';


const router = express.Router();



router.put(
  '/:id',
  auth(USER_ROLE.USER),
  // validateRequest(UserValidation.createUserValidationSchema),
  FollewerControllers.addFollow
);


// router.get('/', FollewerControllers.);

export const FollowRoutes = router;