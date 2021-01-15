import Router from 'koa-router';

import {
  getPromos,
  getOnePromo,
  postPromo,
  putPromo,
} from '../../controllers/promos';

import { serialize } from '../../serialize';

const router = new Router();

router.get('/api/promos', serialize(getPromos));
router.get('/api/promos/:id', serialize(getOnePromo));
router.post('/api/promos/', serialize(postPromo));
router.put('/api/promos/:id', serialize(putPromo));

export default router;
