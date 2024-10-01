
import express from 'express';

import auth from '../../middlewares/auth';


import { USER_ROLE } from '../User/user.constant';
import { FollewerControllers } from './follow.controller';


const router = express.Router();



router.put(
  '/add',
  auth(USER_ROLE.USER),
    FollewerControllers.addFollow
);
router.put(
  '/remove',
  auth(USER_ROLE.USER),
 
  FollewerControllers.removeFollow
);


// router.get('/', FollewerControllers.);

export const FollowRoutes = router;