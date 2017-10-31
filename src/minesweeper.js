class Game {
		constructor(numberOfRows, numberOfColumns, numberOfBombs) {
				this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);

		}
		playMove(rowIndex, columnIndex) {
				this._board.flipTile(rowIndex, columnIndex);
				if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
						console.log('Bomb, Game Over!');
						this._board.print();
				} else if (this._board.hasSafeTiles() === false) {
						console.log('Congratulations, You won!');
				} else {
						console.log('Current Board: ')
						this._board.print();
				}
		}

}



class Board {
		constructor(numberOfRows, numberOfColumns, numberOfBombs) {
			this._numberOfBombs = numberOfBombs;
			this._numberOfTiles = numberOfRows * numberOfColumns;
			this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
			this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
		}
		get playerBoard() {
				return this._playerBoard;
		}
		flipTile(rowIndex, columnIndex) {
			if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
					console.log('This tile has already been flipped!');
					return;
			} else if (this._bombBoard[rowIndex][columnIndex] == 'B') {
					this._playerBoard[rowIndex][columnIndex] = 'B';
			} else {
					this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborsBombs(rowIndex, columnIndex);
			}
			this._numberOfTiles--;
		}

		getNumberOfNeighborsBombs(rowIndex, columnIndex) {
			const neighborOffsets = [
				[-1, -1],
				[-1, 0],
				[-1, 1],
				[0, -1],
				[0, 1],
				[1, -1],
				[1, 0],
				[1, 1]
			];
			const numberOfRows = this._bombBoard.length;
			const numberOfColumns = this._bombBoard[0].length;
			let numberOfBombs = 0;
			neighborOffsets.forEach(offset => {
					const neighborRowIndex = rowIndex + offset[0];
					const neighborColumnIndex = columnIndex + offset[1];
					if (neighborRowIndex >= 0 && 
						neighborRowIndex < this._numberOfRows &&
						neighborColumnIndex >= 0 &&
						neighborColumnIndex < this._numberOfColumns) {
						if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
							this._numberOfBombs++;
						}
					}
			});
			return this._numberOfBombs;
		}
		hasSafeTiles(numberOfTiles, numberOfBombs) {
				return this._numberOfTiles !== this._numberOfBombs;
		}
		print() {
		console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
		
		}
		static generatePlayerBoard(numberOfRows, numberOfColumns) {
		let board = [];
			for (let i = 0; i < numberOfRows; i++) {
				let row = [];
					for (let j = 0; j < numberOfColumns; j++) {
						row.push(' ');
					} 
					board.push(row);
			} 
			return board;
		};
		static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
			let board = [];
			for (let i = 0; i < numberOfRows; i++) {
				let row = [];
					for (let j = 0; j < numberOfColumns; j++) {
						row.push(null);
					} 
					board.push(row);
			} 		

			let numberOfBombsPlaced = 0;
			/* Note: The code in your while loop has the potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow. */
				while (numberOfBombsPlaced < numberOfBombs) {
						let randomRowIndex = Math.floor(Math.random() * numberOfRows);
							let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
								if (board[randomRowIndex][randomColumnIndex] !== 'B') {
										board[randomRowIndex][randomColumnIndex] = 'B';
										numberOfBombsPlaced++;
								}
				}
				return board;
		};

}



//console.log(generatePlayerBoard(2, 4));

	

/*let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 1, -1);
console.log('Updated Player Board: ');
printBoard(playerBoard);*/

const g = new Game(3, 3, 3);
g.playMove(0,0);
