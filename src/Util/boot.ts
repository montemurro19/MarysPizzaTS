import * as http from 'http';
import config from './Config/config';
import logs from './Middlewares/logs';
import db from './Config/db';

export default async function boot(server: http.Server) {
    server.listen(config.port, () => {
        logs.info('server', 'server is connected');
    });

    //await db.connect();
}
