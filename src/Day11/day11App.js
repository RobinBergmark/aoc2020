import React from 'react';

class Day11 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({input: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    let grid = parse2dArray(this.state.input);
    console.log(grid);
    
    let occupiedSeats = -1;
    if(grid.length > 0) {
        console.log('applying rules');
        let gridsAreEqual = false;
        while(!gridsAreEqual) {
            let newGrid = applyRules2(grid);
            gridsAreEqual = equals2d(grid, newGrid);
            grid = newGrid;
        }
        occupiedSeats = countOccupied(grid);
    }
    let resultPart1 = occupiedSeats;
    let resultPart2 = occupiedSeats;
    return (
      <div>
        <h1>Advent of Code 2020 - day 11</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Input: 
              <textarea value={this.state.input} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>Valid part 1: {resultPart1}</div>
        <div>Valid part 2: {resultPart2}</div>
        <div>
            <table>
                <thead>
                    <tr>
                    {grid[0].map((item, index) => {
                        return <th key={index}>{item}</th>;
                    })}
                    </tr>
                </thead>
                <tbody>
                    {grid.slice(1, grid.length).map((item, index) => {
                    return (
                        <tr key={index}>
                        {item.map((item2, index2) => {
                            return <td key={index2}>{item2}</td>;
                        })}
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>

      </div>
    );
  }
}

function clone2d(grid) {
    return grid.map(o => [...o]);
}

function countOccupied(grid) {
    let count = 0;
    for(let i = 0; i < grid.length; i++) {
        if(!grid[i]) return -1;
        for(let j = 0; j < grid[i].length; j++) {
            if(isOccupied(grid[i][j])) {
                count++;
            }
        }
    }
    return count;
}

function equals2d(arr1, arr2) {
    for(let i = 0; i < arr1.length; i++) {
        if(!arr1[i] || !arr2[i]) continue;
        for(let j = 0; j < arr1[i].length; j++) {
            if(arr1[i][j] !== arr2[i][j]) return false;
        }
    }
    return true
}

function applyRules(originalGrid) {
    let newGrid = clone2d(originalGrid);
    for(let row = 0; row < originalGrid.length; row++) {
        for(let col = 0; col < originalGrid[row].length; col++) {
            let currentVal = originalGrid[row][col];
            if(currentVal === '.') {
                continue;
            }
            let adj = findAdjacent(originalGrid, row, col);
            let occSeats = adj.filter(v => v.value === '#').length;
            if(isEmpty(currentVal) && occSeats === 0) {
                newGrid[row][col] = '#';
            } else {
                if(occSeats >= 4) {
                    newGrid[row][col] = 'L';
                }
            }
        }
    }
    return newGrid;
}

function applyRules2(originalGrid) {
    let newGrid = clone2d(originalGrid);
    for(let row = 0; row < originalGrid.length; row++) {
        for(let col = 0; col < originalGrid[row].length; col++) {
            let currentVal = originalGrid[row][col];
            if(currentVal === '.') {
                continue;
            }
            let visibleSeats = findVisibleSeats(originalGrid, row, col);
            let occSeats = visibleSeats.filter(v => v.value === '#').length;
            if(isEmpty(currentVal) && occSeats === 0) {
                newGrid[row][col] = '#';
            } else {
                if(occSeats >= 5) {
                    newGrid[row][col] = 'L';
                }
            }
        }
    }
    return newGrid;
}

function findVisibleSeats(grid, sourceRow, sourceCol) {
    let directions = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
        [-1, 1],
        [-1, -1],
        [1, -1],
        [1, 1]
    ]
    let visibleSeats = [];
    for(let dir of directions) {
        let rowChange = dir[0];
        let colChange = dir[1];
        let row = sourceRow;
        let col = sourceCol;
        while((row < grid.length && row >= 0) && (col < grid[0].length && col >= 0)) {
            let current = grid[row][col];
            // console.log({rowC: rowChange, row: row, colC: colChange, col: col, });
            if(current !== '.' && !(row === sourceRow && col === sourceCol)) {
                visibleSeats.push({value: grid[row][col], row: row, col: col});
                break;
            }
            row += rowChange;
            col += colChange;
        }
    }
    return visibleSeats;
}

function isEmpty(v) {
    return v === 'L';
}

function isOccupied(v) {
    return v === '#';
}

function findAdjacent(grid, row, col) {
    let adjacentSeats = [];
    for (let drow = -1; drow <= 1; ++drow) {
        for (let dcol = -1; dcol <= 1; ++dcol) {
            let adjRow = row+drow;
            let adjCol = col+dcol
            if(adjRow < 0 || adjRow >= grid.length || adjCol < 0 || adjCol >= grid[adjRow].length) {
                continue;
            }
            if(grid[adjRow][adjCol] === '.') {
                continue;
            }
            if (drow !== 0 || dcol !== 0) {
                adjacentSeats.push({value: grid[adjRow][adjCol], row: adjRow, col: adjCol});
            }
        }
    }
    return adjacentSeats;
}

function parse2dArray(input) {
    if(!input) {
        let res = [];
        res[0] = [];
        return res;
    }
    let arr = [];
    let rows = input.split('\n').map(line => line);
    console.log(rows.length);
    for(let row = 0; row < rows.length; row++) {
        if(!arr[row]) arr[row] = [];
        for(let col = 0; col < rows[row].length; col++) {
            arr[row][col] = rows[row].charAt(col);
        }
    }
    return arr;
}
export default Day11;