import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  constructor() { super('MainScene'); } // ← opcionális, de hasznos
  private pathY = 300; // központi út Y koordináta

  create() {
    this.add.text(16, 16, 'Versus TD', { fontSize: '16px', color: '#fff' });

    // Középső út
    const g = this.add.graphics();
    g.lineStyle(6, 0xffffff, 1);
    g.moveTo(50, this.pathY);
    g.lineTo(750, this.pathY);
    g.strokePath();

    this.drawTowerSlots();
  }

  private drawTowerSlots() {
    const slotsLeft: [number, number][]  = [[200,220],[260,380],[320,220],[380,380]];
    const slotsRight: [number, number][] = [[500,220],[560,380],[620,220],[680,380]];

    const drawSlot = (x: number, y: number, color: number) => {
      // keret
      const g = this.add.graphics();
      g.lineStyle(2, color, 1);
      g.strokeRect(x - 16, y - 16, 32, 32);

      // kattintható zóna
      const zone = this.add.zone(x, y, 32, 32).setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => {
        // FONTOS: game-szintű emitter (React oldalról könnyű hallgatni)
        this.game.events.emit('slot:click', { x, y });
      });
    };

    slotsLeft.forEach(([x,y])  => drawSlot(x, y, 0xff0000));
    slotsRight.forEach(([x,y]) => drawSlot(x, y, 0x0000ff));
  }
}
