import React from 'react';
import Grid from './Grid.jsx';
import { useGameLogic } from './useGameLogic.jsx';

export default function App() {
  const {
    tiles,
    started,
    isGameOver,
    isCleared,
    moveCount,
    handleStartReset,
    lastDirection,
  } = useGameLogic();

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <button
        onClick={handleStartReset}
        style={{
          padding: '6px 12px',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '10px'
        }}
      >
        {started ? 'リセット' : 'スタート'}
      </button>

      {started && (
        <div style={{ marginBottom: '10px', fontSize: '16px' }}>
          移動回数: {moveCount}
        </div>
      )}

      <Grid tiles={tiles} lastDirection={lastDirection} />

      {isGameOver && (
        <div style={overlayStyle('#ffdddd', '#f00')}>ゲームオーバー</div>
      )}

      {isCleared && (
        <div style={overlayStyle('#ddffdd', '#0a0')}>クリア！</div>
      )}
    </div>
  );
}

function overlayStyle(bgColor, borderColor) {
  return {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: bgColor,
    padding: '20px 40px',
    fontSize: '24px',
    fontWeight: 'bold',
    border: `2px solid ${borderColor}`,
    borderRadius: '8px',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-in-out',
  };
}
