import Router from 'koa-router';

import { getMembers } from '../../controllers/members';

import { serialize } from '../../serialize';

const router = new Router();

router.get('/api/members', serialize(getMembers));

export default router;
