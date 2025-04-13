export const getRandomValue = () => [2, 4, 8, 16][Math.floor(Math.random() * 4)];

export const getRandomEmptyIndex = (usedIndexes) => {
    const available = [...Array(16).keys()].filter(i => !usedIndexes.includes(i));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
};

export const slideAndMerge = (tiles, direction) => {
    const newTiles = [];
    const getRow = (i) => Math.floor(i / 4);
    const getCol = (i) => i % 4;

    for (let i = 0; i < 4; i++) {
        const line =
            direction === 'left' || direction === 'right'
                ? tiles.filter(t => getRow(t.index) === i)
                : tiles.filter(t => getCol(t.index) === i);

        const sorted = [...line].sort((a, b) => {
            if (direction === 'left') return getCol(a.index) - getCol(b.index);
            if (direction === 'right') return getCol(b.index) - getCol(a.index);
            if (direction === 'up') return getRow(a.index) - getRow(b.index);
            if (direction === 'down') return getRow(b.index) - getRow(a.index);
            return 0;
        });

        const merged = [];
        let skip = false;

        for (let j = 0; j < sorted.length; j++) {
            if (skip) {
                skip = false;
                continue;
            }

            const current = sorted[j];
            const next = sorted[j + 1];

            if (next && current.value === next.value) {
                merged.push({ value: current.value * 2 });
                skip = true;
            } else {
                merged.push({ value: current.value });
            }
        }

        for (let k = 0; k < merged.length; k++) {
            let index;
            if (direction === 'left') index = i * 4 + k;
            if (direction === 'right') index = i * 4 + (3 - k);
            if (direction === 'up') index = k * 4 + i;
            if (direction === 'down') index = (3 - k) * 4 + i;
            newTiles.push({ index, value: merged[k].value });
        }
    }

    return newTiles;
};

export const tilesAreEqual = (a, b) => {
    if (a.length !== b.length) return false;
    const sa = [...a].sort((x, y) => x.index - y.index);
    const sb = [...b].sort((x, y) => x.index - y.index);
    return sa.every((t, i) => t.index === sb[i].index && t.value === sb[i].value);
};

export const checkGameOver = (tiles) => {
    const directions = ['left', 'right', 'up', 'down'];
    return directions.every(dir => {
        const moved = slideAndMerge(tiles, dir);
        return tilesAreEqual(tiles, moved);
    });
};

export const getTileColor = (value) => {
    switch (value) {
        case 2: return '#fff2e6';
        case 4: return '#ffdfb3';
        case 8: return '#ffcc80';
        case 16: return '#ffb84d';
        case 32: return '#ffa31a';
        case 64: return '#e69500';
        case 128: return '#cc7a00';
        case 256: return '#b36b00';
        case 512: return '#995c00';
        case 1024: return '#804d00';
        case 2048: return '#663d00';
        default: return '#ffd9b3';
    }
};
