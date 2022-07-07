const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  board = [[]];
  constructor(inputData) {
    // this.board = inputBoard;
    // this.currentPosition = [0, 0];
    this.board = inputData[0]; // newBoard จาก generateField
    this.currentPosition = inputData[1]; // currentPosition จาก generateField
  }

  showBoardGame() {
    console.log(this.board.map((item) => item.join("")).join("\n"));
  }

  moveUp() {
    if (this.currentPosition[1] - 1 >= 0) {
      this.updatePosition(this.currentPosition, pathCharacter);

      this.currentPosition[1]--;
      this.updatePosition(this.currentPosition, pathCharacter);

      console.log(this.currentPosition);
    }
  }
  moveDown() {
    if (this.currentPosition[1] + 1 < this.board.length) {
      this.updatePosition(this.currentPosition, pathCharacter);

      this.currentPosition[1]++;
      this.updatePosition(this.currentPosition, pathCharacter);

      console.log(this.currentPosition);
    }
  }
  moveRight() {
    if (this.currentPosition[0] + 1 < this.board[0].length) {
      this.updatePosition(this.currentPosition, pathCharacter);

      this.currentPosition[0]++;
      this.updatePosition(this.currentPosition, pathCharacter);

      console.log(this.currentPosition);
    }
  }
  moveLeft() {
    if (this.currentPosition[0] - 1 >= 0) {
      this.updatePosition(this.currentPosition, pathCharacter);

      this.currentPosition[0]--;
      this.updatePosition(this.currentPosition, pathCharacter);

      console.log(this.currentPosition);
    }
  }

  updatePosition(position, symbol) {
    const x = position[0];
    const y = position[1];
    if (this.board[y][x] === hole) {
      throw Error("You are Dead");
    }
    if (this.board[y][x] === hat) {
      throw Error("You are win");
    }
    this.board[y][x] = symbol;
  }

  static generateField(height, width, holes) {
    // console.log(height)
    // console.log(width)
    let newBoard = [];

    // Genarate Board
    for (let i = 0; i < height; i++) {
      newBoard.push([]);
      console.log("loop แรก", i);
      for (let j = 0; j < width; j++) {
        console.log(i, j);
        console.log(newBoard[i]);
        newBoard[i].push(fieldCharacter);
      }
    }
    console.log("Create New Field", newBoard);

    // newBoard[0][0] = pathCharacter;
    let hatPositionX = Math.floor(Math.random() * width);
    console.log("hatPositionX", hatPositionX);
    let hatPositionY = Math.floor(Math.random() * height);
    console.log("hatPositionY", hatPositionY);
    let StartPositionX = Math.floor(Math.random() * width);
    console.log("StartPositionX", StartPositionX);
    let StartPositionY = Math.floor(Math.random() * height);
    console.log("StartPositionY", StartPositionY);

    newBoard[hatPositionY][hatPositionX] = hat;
    // console.log('create hat in field',newBoard)

    // Random Hole
    for (let k = holes; k > 0; k--) {
      let holePositionX = hatPositionX;
      //   console.log("holePositionX", holePositionX);
      let holePositionY = hatPositionY;
      //   console.log("holePositionY", holePositionY);
      //   console.log(
      //     "holePositionX compare hatPositionX",
      //     holePositionX === hatPositionX
      //   );
      //   console.log(
      //     "holePositionY compare hatPositionY",
      //     holePositionY === hatPositionY
      //   );

      while (holePositionX === hatPositionX) {
        holePositionX = Math.floor(Math.random() * width);
      }
      while (holePositionY === hatPositionY) {
        holePositionY = Math.floor(Math.random() * height);
      }
      newBoard[holePositionY][holePositionX] = hole;
    }

    // Random Position
    newBoard[StartPositionY][StartPositionX] = pathCharacter;
    let currentPosition = [StartPositionX, StartPositionY];

    return [newBoard, currentPosition];
  }
}

let initData = Field.generateField(10, 21, 20);
const myField = new Field(initData);

while (true) {
  const input = prompt(`คุณต้องเดินแล้ว`);
  console.clear();
  try {
    switch (input) {
      case "8":
        myField.moveUp();
        break;
      case "5":
        myField.moveDown();
        break;
      case "4":
        myField.moveLeft();
        break;
      case "6":
        myField.moveRight();
        break;
    }
    myField.showBoardGame();
  } catch (e) {
    console.log(e);
    break;
  }
}
