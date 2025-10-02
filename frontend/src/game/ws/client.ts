type OutMsg =
  | { type: 'join_match'; matchId: string; token: string }
  | { type: 'build_tower'; slotId: number; towerType: string }
  | { type: 'upgrade_tower'; towerId: string }
  | { type: 'send_wave'; unitType: string; count: number }
  | { type: 'heartbeat'; ts: number };

type InMsg =
  | { type: 'hello'; matchId: string }
  | { type: 'state'; tick: number; diff: unknown }
  | { type: 'event'; eventType: string; data: unknown }
  | { type: 'match_end'; winner: string };

export class WsClient {
  private ws?: WebSocket;
  private url: string;
  private listeners = new Set<(m: InMsg) => void>();
  private reconnectDelay = 1000;

  constructor(url: string) { this.url = url; }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data) as InMsg;
      this.listeners.forEach((l) => l(msg));
    };
    this.ws.onclose = () => setTimeout(() => this.connect(), this.reconnectDelay);
  }

  send(msg: OutMsg) { this.ws?.send(JSON.stringify(msg)); }
  onMessage(fn: (m: InMsg) => void) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
}
