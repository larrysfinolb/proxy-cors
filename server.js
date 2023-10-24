import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(
  createProxyMiddleware({
    router: (req) => new URL(req.path.substring(1)),
    pathRewrite: (path, req) => new URL(req.path.substring(1)).pathname,
    changeOrigin: true,
    logger: console,
  })
);

app.listen(process.env.PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
