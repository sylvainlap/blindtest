import path from 'path';
import koa from 'koa';
import serve from 'koa-static';

const app = koa();

const staticDir = path.join(process.cwd(), './static');
app.use(serve(staticDir));

app.listen(3000);
console.log('listening on port 3000');
