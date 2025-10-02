// src/pages/Game.tsx
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { MainScene } from '../game/scenes/MainScene';
import { WsClient } from '../game/ws/client';
import { useStore } from '../app/store';
import { BuildPanel } from '../components/Buidpanel.tsx'; // ✅ helyes import

export default function Game() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { user, match } = useStore();

  // Phaser indítás
  useEffect(() => {
    if (!containerRef.current) return;
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: containerRef.current, // ✅ ide mountol a canvas
      backgroundColor: '#111',
      scene: [MainScene],
    });
    return () => game.destroy(true);
  }, []);

  // WS kapcsolat
  useEffect(() => {
    const ws = new WsClient(import.meta.env.VITE_WS_URL);
    ws.connect();
    if (user && match.matchId) {
      const off = ws.onMessage((m) => {
        if (m.type === 'state') {
          // TODO: diff alkalmazása
        }
      });
      ws.send({ type: 'join_match', matchId: match.matchId!, token: user.token });
      return () => off();
    }
  }, [user, match.matchId]);

  // Build gomb kezelő
  function handleBuild(type: string) {
    console.log('Build tower:', type);
    // TODO: kiválasztott slot + ws.send({ type:'build_tower', slotId, towerType: type })
  }



  

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 800px 1fr', gap: 16 }}>
      <aside>{/* (opció) ide jöhet más UI */}</aside>

      {/* Középső oszlop: Phaser + overlay panel */}
      <div style={{ position: 'relative', width: 800, height: 600, border: '1px solid #333' }}>
        {/* Phaser vászon */}
        <div
          ref={containerRef}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />
        {/* Overlay réteg (panel a vászon fölött) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none', // minden katt átmegy, kivéve ahol auto
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: 'rgba(0,0,0,0.6)',
              color: '#fff',
              padding: 12,
              borderRadius: 8,
              minWidth: 160,
              pointerEvents: 'auto', // a gombok kattinthatók
            }}
          >
            <BuildPanel onBuild={handleBuild} />
          </div>
        </div>
      </div>

      <aside>{/* (opció) Send Wave panel helye */}</aside>
    </div>
  );
}
