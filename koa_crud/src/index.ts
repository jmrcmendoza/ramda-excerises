import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import vendorsRoutes from './routes/vendors';

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(bodyParser());

const uri = 'mongodb://localhost:27017/local';

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('Successfully connected to MongoDB');
    }
  },
);

app.use(vendorsRoutes.routes());

const server = app
  .listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
  });

export default server;
