import { Server as WebSocketServer } from 'ws';
const TickerController = require('./TickerController');

export class WebsocketController {
    private wss;
    constructor(server: any, config: any) {
        this.wss = new WebSocketServer({ server })
        const tickerController: any = new TickerController(config);
        this.wss.on('connection', (ws) => {
            tickerController.addClient(ws);
        })
    }
}

module.exports = WebsocketController;