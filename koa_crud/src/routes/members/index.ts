import Router from 'koa-router';

import {
  getMembers,
  getOneMember,
  postMember,
} from '../../controllers/members';

import { serialize } from '../../serialize';

const router = new Router();

router.get('/api/members', serialize(getMembers));
router.get('/api/members/:id', serialize(getOneMember));
router.post('/api/members', serialize(postMember));

export default router;
