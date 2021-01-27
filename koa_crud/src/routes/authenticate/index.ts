import Router from 'koa-router';

import { authMember } from '@Controllers/authenticate';

import { serialize } from '@Serialize';

const router = new Router();

router.post('/api/authenticate', serialize(authMember));

export default router;
