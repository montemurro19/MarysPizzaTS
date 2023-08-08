import Mongo from './common/mongo.connection';
import Server from './server';

const server = new Server();
const db = new Mongo();

server.start();
db.connect();
