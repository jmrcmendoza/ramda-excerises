import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-koa';
import vendorsRoutes from './routes/vendors';
import membersRoutes from './routes/members';
import authenicateRoute from './routes/authenticate';
import promoRoutes from './routes/promos';
import promoEnrollmentRequestRoutes from './routes/promo-enrollment-requests';

import { typeDefs } from './schema';
import resolvers from './schema/resolvers';
import { verifyToken } from './middleware/authorization';

const app = new Koa();

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: verifyToken,
});

graphqlServer.applyMiddleware({ app });

const PORT = process.env.PORT || 3000;

app.use(bodyParser());

const uri = 'mongodb://mongo:27017/onboarding';

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err: any) => {
    if (err) {
      console.log(err.message);
    }
  },
);

mongoose.set('runValidators', true);

app.use(vendorsRoutes.routes());
app.use(membersRoutes.routes());
app.use(authenicateRoute.routes());
app.use(promoRoutes.routes());
app.use(promoEnrollmentRequestRoutes.routes());

const server = app
  .listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
  });

export default server;
