import React from 'react';
import { getTileColor } from './tileLogic.jsx';

const TILE_SIZE = 80;
const GAP = 5;

export default function Grid({ tiles = [] }) {
  return (
    <div style={{
      position: 'relative',
      width: TILE_SIZE * 4 + GAP * 3,
      height: TILE_SIZE * 4 + GAP * 3,
      margin: '0 auto',
      backgroundColor: '#999',
      display: 'grid',
      gridTemplateColumns: `repeat(4, ${TILE_SIZE}px)`,
      gridTemplateRows: `repeat(4, ${TILE_SIZE}px)`,
      gap: `${GAP}px`,
    }}>
      {/* 背景マス */}
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: TILE_SIZE,
            height: TILE_SIZE,
            backgroundColor: '#ccc',
            borderRadius: 4,
          }}
        />
      ))}

      {/* タイル表示 */}
      {tiles.map((tile, i) => {
        const row = Math.floor(tile.index / 4);
        const col = tile.index % 4;
        return (
          <div
            key={`${tile.index}-${tile.value}-${i}`}
            style={{
              position: 'absolute',
              width: TILE_SIZE,
              height: TILE_SIZE,
              top: row * (TILE_SIZE + GAP),
              left: col * (TILE_SIZE + GAP),
              backgroundColor: getTileColor(tile.value),
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '20px',
              transition: 'all 0.2s ease-in-out',
              zIndex: 1,
            }}
          >
            {tile.value}
          </div>
        );
      })}
    </div>
  );
}
