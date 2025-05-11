function getMinMove(
    start: string,
    target: string,
    brokenTiles: string[]
  ): number {
    // Convert to coord
    const posToCoord = function (pos: string): [number, number] {
      const col = pos.charCodeAt(0) - "a".charCodeAt(0);
      const row = parseInt(pos[1]) - 1;
      return [row, col];
    };
    
    // Convert to pos
    const coordToPos = function (row: number, col: number): string {
      return String.fromCharCode("a".charCodeAt(0) + col) + (row + 1);
    };
  
    const brokenObj: { [key: string]: boolean } = {};
    for (let i = 0; i < brokenTiles.length; i++) {
      brokenObj[brokenTiles[i]] = true;
    }
  
    const knightMoves = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];
  
    const bfs = function (
      startCoord: [number, number],
      targetCoord: [number, number]
    ): number {
      const queue: [number, number, number][] = []; // [row, col, moveCount]
      const visited: { [key: string]: boolean } = {};
  
      // Push start pos
      queue.push([startCoord[0], startCoord[1], 0]);
      visited[startCoord[0] + "," + startCoord[1]] = true;
  
      while (queue.length > 0) {
        const current = queue.shift()!; // Check the least level movement
        const row = current[0];
        const col = current[1];
        const moves = current[2];
  
        if (row === targetCoord[0] && col === targetCoord[1]) {
          return moves;   // Found
        }
  
        // Try all
        for (let i = 0; i < knightMoves.length; i++) {
          const diffRow = knightMoves[i][0];
          const diffCol = knightMoves[i][1];
          const newRow = row + diffRow;
          const newCol = col + diffCol;
          const newPos = coordToPos(newRow, newCol);
          const visitKey = newRow + "," + newCol;
  
          // Validate
          if (
            newRow >= 0 &&
            newRow < 8 &&
            newCol >= 0 &&
            newCol < 8 &&
            !brokenObj[newPos] && // Validate broken tile
            !visited[visitKey] // Havent visited
          ) {
            queue.push([newRow, newCol, moves + 1]);
            visited[visitKey] = true;
          }
        }
      }
  
      return -1;
    };
  
    const startCoord = posToCoord(start);
    const targetCoord = posToCoord(target);
  
    // Die if start or target is broken
    if (brokenObj[start] || brokenObj[target]) {
      return -1;
    }
  
    return bfs(startCoord, targetCoord);
  }
  
  console.log(getMinMove("d6", "h8", ["f6", "f7"]));
  
  // just for testing: case no broken tiles
  console.log(getMinMove("h1", "h5", []));
  
  // just for testing: case no path available
  console.log(getMinMove("h1", "h5", ["g3", "f2"]));
  
  // just for testing: case start or target is broken
  console.log(getMinMove("h1", "h5", ["h1"])); 