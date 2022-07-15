import { Router } from 'express';
import { deflate } from 'zlib';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello Dev!' });
});

export default routes;
