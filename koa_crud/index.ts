import Koa from 'koa';

const app = new Koa();
const PORT = 3000;

app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
