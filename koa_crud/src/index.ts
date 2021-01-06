import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import vendorsRoutes from './routes/vendors';

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(bodyParser());

app.use(vendorsRoutes.routes());

const server = app
  .listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
  });

export default server;
