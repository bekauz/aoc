function p1(numbers: string, boards: string): number {

    const guesses = numbers.split(`,`);
    const boardArray = boards.split(`\n\n`).map(board => board.trim());
    const guessedBoards: number[][][] = [];
    let numToBoardMap: Map<number, { boardId: number, row: number, col: number}[]> = new Map();

    prepareBoards(guessedBoards, boardArray, numToBoardMap);


    for (let i = 0; i < guesses.length; i++) {

        const guessNum = parseInt(guesses[i]);
        let boardsWithGuess = numToBoardMap.get(guessNum);
            
        if (boardsWithGuess != undefined) {

            for (let j = 0; j < boardsWithGuess.length; j++) {
                const indices: { boardId: number, row: number, col: number} = boardsWithGuess[j];
                guessedBoards[indices.boardId][indices.row][indices.col] = Number.MIN_VALUE;
                const check = checkFiveConsecutive(guessedBoards[indices.boardId], indices.row, indices.col);
                if (check) {
                    const missedNumSum = getUnmarkedNumberSum(guessedBoards[indices.boardId]);
                    return missedNumSum * guessNum;
                }
            }
        }
    }

    return 0;
}

function p2(numbers: string, boards: string): number {
    const guesses = numbers.split(`,`);
    const boardArray = boards.split(`\n\n`).map(board => board.trim());
    const guessedBoards: number[][][] = [];
    let numToBoardMap: Map<number, { boardId: number, row: number, col: number}[]> = new Map();

    prepareBoards(guessedBoards, boardArray, numToBoardMap);

    let lastVictoriousBoard: number[][] = [];
    let lastVictoriousScore: number = 0;
    let victoriousBoardIndices: number[] = [];

    for (let i = 0; i < guesses.length; i++) {

        const guessNum = parseInt(guesses[i]);
        let boardsWithGuess = numToBoardMap.get(guessNum);
        if (boardsWithGuess != undefined) {
            for (let j = 0; j < boardsWithGuess.length; j++) {
                const indices: { boardId: number, row: number, col: number} = boardsWithGuess[j];
                if (victoriousBoardIndices.indexOf(indices.boardId) < 0) {
                    guessedBoards[indices.boardId][indices.row][indices.col] = Number.MIN_VALUE;
                    const check = checkFiveConsecutive(guessedBoards[indices.boardId], indices.row, indices.col);
                    if (check) {
                        lastVictoriousBoard = guessedBoards[indices.boardId];
                        victoriousBoardIndices.push(indices.boardId);
                        lastVictoriousScore = getUnmarkedNumberSum(lastVictoriousBoard) * guessNum;
                    }    
                }
            }
        }
    }

    return lastVictoriousScore;
}

function getUnmarkedNumberSum(board: number[][]): number {

    let sum = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] != Number.MIN_VALUE) {
                sum += board[i][j];
            }
        }
    }
    return sum;
}

function checkFiveConsecutive(board: number[][], row: number, col: number): boolean {

    let colCheck: boolean = true;
    let rowCheck: boolean = true;

    // check given row for 5 consec
    for (let x = 0; x < board[row].length; x++) {
        if (board[row][x] != Number.MIN_VALUE) {
            rowCheck = false;
            break;
        }
    }

    // check given column for 5 consec
    for (let y = 0; y < board.length; y++) {
        if (board[y][col] != Number.MIN_VALUE) {
            colCheck = false;
            break;
        }
    }

    return colCheck || rowCheck;
}

function prepareBoards(guessedBoards: number[][][], boardArray: string[], numToBoardMap: Map<number, { boardId: number, row: number, col: number}[]>): void {
    for (let i = 0; i < boardArray.length; i++) {
        guessedBoards[i] = [];
        const rows = boardArray[i].split(`\n`).map(row => row.trim());
        for (let row = 0; row < rows.length; row++) {
            guessedBoards[i][row] = [];
            const cols = rows[row].split(' ')
                .map(val => parseInt(val.replace(/\D/g, '')))
                .filter(val => Number.isInteger(val));
            for (let col = 0; col < cols.length; col++) {
                // prefill the result table
                const val = cols[col];
                guessedBoards[i][row][col] = val;

                let currentValIndices = numToBoardMap.get(val);
                if (currentValIndices == undefined) {
                    currentValIndices = [];
                    currentValIndices.push({ boardId: i, row, col});
                    numToBoardMap.set(val, currentValIndices);
                } else {
                    currentValIndices.push({ boardId: i, row, col});
                    numToBoardMap.set(val, currentValIndices);
                }
            }
        }
    }
}