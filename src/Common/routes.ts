import express from 'express';
import ItemRoutes from '../Item/item.routes';
import UserRoutes from '../User/user.routes';
import AddressRoutes from '../Address/address.routes';

const routes = (server: express.Application): void => {
    server.use('/item', new ItemRoutes().router);
    server.use('/user', new UserRoutes().router);
    server.use('/address', new AddressRoutes().router);
};

export default routes;
