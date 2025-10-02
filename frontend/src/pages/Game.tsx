// src/pages/Game.tsx
import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { MainScene } from '../game/scenes/MainScene';
import { BuildPanel } from '../components/Buidpanel'; // <-- NINCS .tsx a végén

export default function Game() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ x: number; y: number } | null>(null);

  // 1) Phaser indítása + FELIRATKOZÁS UGYANITT
  useEffect(() => {
    if (!containerRef.current) return;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: containerRef.current,
      backgroundColor: '#111',
      scene: [MainScene],
    });
    gameRef.current = game; // <-- EDDIG hiányzott

    const onSlotClick = (data: { x: number; y: number }) => {
      console.log('Slot selected:', data);
      setSelectedSlot(data);
    };
    game.events.on('slot:click', onSlotClick); // <-- biztosan feliratkozunk

    return () => {
      game.events.off('slot:click', onSlotClick);
      game.destroy(true);
      gameRef.current = null;
    };
  }, []);

  function handleBuild(type: string) {
    if (!selectedSlot) {
      console.log('Nincs kijelölt slot – kattints a pályán egy négyzetre.');
      return;
    }
    console.log('Építés:', type, 'ide:', selectedSlot);
    // TODO: ws.send({ type:'build_tower', slotId: ..., towerType: type })
  }

  return (
    <div style={{ position: 'relative', width: 800, height: 600, border: '1px solid #333' }}>
      {/* Phaser vászon */}
      <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Panel a vászon fölött */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(0,0,0,0.6)',
            padding: 12,
            borderRadius: 8,
            minWidth: 160,
            pointerEvents: 'auto',
          }}
        >
          <BuildPanel onBuild={handleBuild} />
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
            Kijelölt slot: {selectedSlot ? `x=${selectedSlot.x}, y=${selectedSlot.y}` : 'nincs'}
          </div>
        </div>
      </div>
    </div>
  );
}
