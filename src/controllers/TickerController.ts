import Snapshot from '../models/Snapshot';
import WebSocket from 'ws';

class TickerController {
    private wss;
    private wsData: string;
    private clients: any[];
    private createSnapshotInterval: any;
    constructor(config: any) {
        this.wss = new WebSocket(config.BITFINEX_ENDPOINT)
        this.clients = [];
        this.wss.on('open', () => {
            this.wss.send(JSON.stringify({
                event: "subscribe",
                channel: "ticker",
                pair: config.BITFINEX_SYMBOL
            }));

            this.createSnapshotInterval = setInterval(async () => {
                console.log(`Snapshot: ${this.wsData}`);
                Snapshot.create({ data: JSON.parse(this.wsData) });
            }, 30000); //take a snapshot every 30 seconds
        })
        
        this.wss.on('message', (payload: string) => {
            const message = JSON.parse(payload.toString());
            if (!Array.isArray(message[1])) return;
            console.log(`received data from ticker ${message}`);
            const [ bid, bidSize, ask, askSize, dailyChange, dailyChangeRelative, price, volume, high, low ] = message[1];
            
            // return only data given in https://docs.bitfinex.com/v1/reference/rest-public-ticker#ws-public-ticker as per requirement
            const data = {
                price,
                high,
                bid,
                low,
                volume,
                ask,
                mid: (bid+ask)/2,
                timestamp: new Date().getTime()
            }
        
            this.wsData = JSON.stringify(data);
        
            this.clients.forEach((ws) => {
                ws.send(this.wsData)
            });
        });

        this.wss.on('close', () => {
            clearInterval(this.createSnapshotInterval);
        })
    }

    addClient(ws: WebSocket) {
        this.clients.push(ws);
        console.log('client connected');
    }
}

module.exports = TickerController;