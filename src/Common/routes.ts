import express from 'express';
import ItemRoutes from '../Item/item.routes';

const routes = (server: express.Application): void => {
    server.use('/item', new ItemRoutes().router);
};

export default routes;
