import Router from 'koa-router';

import { getMembers, getOneMember } from '../../controllers/members';

import { serialize } from '../../serialize';

const router = new Router();

router.get('/api/members', serialize(getMembers));
router.get('/api/members/:id', serialize(getOneMember));

export default router;
