import http from 'http';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import database from '../src/config/database'
const WebsocketController = require('./controllers/WebsocketController');
const Snapshot = require('./models/Snapshot');

dotenv.config()

const { PORT } = process.env;
const app = express();
const server = http.createServer(app);
const ws = new WebsocketController(server, process.env);

// authenticate database
database
    .authenticate()
    .then(()=> {
        console.log('db connection successful');
        // create or update database tables 
        return database.sync();
    })
    .catch((err) => console.log(err));

server.listen(PORT, () => {
    console.log(`Server started on port at http://localhost:${PORT}`);
});

app.get('/', (req: Request, res: Response) => {
    res.send('test');
});
