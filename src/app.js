import express from 'express';
import path from 'path';
import cors from 'cors';
import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'resources')));
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;