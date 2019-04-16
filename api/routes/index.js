import express from 'express';

const routes = express.Router();

routes.get('/', (_, res) => res.render('index'));

export default routes;
