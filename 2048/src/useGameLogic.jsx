import { useState, useEffect } from 'react';
import {
  getRandomValue,
  getRandomEmptyIndex,
  slideAndMerge,
  tilesAreEqual,
  checkGameOver
} from './tileLogic.jsx';

export function useGameLogic() {
  const [tiles, setTiles] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [hasClearedOnce, setHasClearedOnce] = useState(false);
  const [lastDirection, setLastDirection] = useState(null);

  const handleStartReset = () => {
    if (!started) {
      const index = Math.floor(Math.random() * 16);
      const value = getRandomValue();
      setTiles([{ index, value }]);
      setMoveCount(0);
      setIsGameOver(false);
      setIsCleared(false);
      setHasClearedOnce(false);
      setLastDirection(null);
      setStarted(true);
    } else {
      setTiles([]);
      setMoveCount(0);
      setIsGameOver(false);
      setIsCleared(false);
      setHasClearedOnce(false);
      setLastDirection(null);
      setStarted(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!started || tiles.length === 0 || isGameOver) return;
    if (isCleared) setIsCleared(false);

    let direction = null;
    if (e.key === 'ArrowLeft') direction = 'left';
    if (e.key === 'ArrowRight') direction = 'right';
    if (e.key === 'ArrowUp') direction = 'up';
    if (e.key === 'ArrowDown') direction = 'down';
    if (!direction) return;

    const updated = slideAndMerge(tiles, direction);
    if (tilesAreEqual(tiles, updated)) return;

    setLastDirection(direction);

    const used = updated.map(t => t.index);
    const newIndex = getRandomEmptyIndex(used);
    if (newIndex !== null) {
      updated.push({ index: newIndex, value: getRandomValue() });
    }

    setTiles(updated);
    setMoveCount(m => m + 1);

    if (!hasClearedOnce && updated.some(t => t.value === 2048)) {
      setIsCleared(true);
      setHasClearedOnce(true);
    }
  };

  useEffect(() => {
    if (!started || tiles.length < 16 || isGameOver || isCleared) return;
    if (checkGameOver(tiles)) setIsGameOver(true);
  }, [tiles]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return {
    tiles,
    started,
    isGameOver,
    isCleared,
    moveCount,
    handleStartReset,
    lastDirection
  };
}
