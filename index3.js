const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field = [[]]) {
    this._field = field;

    this._xHat = 0;
    this._yHat = 0;

    this._xCursor = 0;
    this._yCursor = 0;
  }

  print() {
    const displayString = this._field
      .map((row) => {
        return row.join("");
      })
      .join("\n");
    console.log(displayString);
  }

  isCorrectKeyPressed(key) {
    let arrKey = ["a", "s", "d", "w"];
    return arrKey.includes(key) ? true : false;
  }

  isWithinBoundary() {
    if (
      this._xCursor >= 0 &&
      this._xCursor < height &&
      this._yCursor >= 0 &&
      this._yCursor < width
    ) {
      return true;
    } else {
      return false;
    }
  }

  foundHole() {
    let nextChar = this._field[this._xCursor][this._yCursor];
    if (nextChar === hole) {
      return true;
    } else {
      return false;
    }
  }

  foundHat() {
    let nextChar = this._field[this._xCursor][this._yCursor];
    if (nextChar === hat) {
      return true;
    } else {
      return false;
    }
  }

  start() {
    let hatHasBeenFound = false;
    let loop = true;
    let deathString = "";
    while (loop) {
      this.print();
      let prevPosX = this._xCursor;
      let prevPosY = this._yCursor;
      let key = prompt("press a-s-d-w key: ");

      // console.log(key)

      if (this.isCorrectKeyPressed(key)) {
        if (key === "s") {
          this._xCursor += 1;
        } else if (key === "w") {
          this._xCursor -= 1;
        } else if (key === "a") {
          this._yCursor -= 1;
        } else if (key === "d") {
          this._yCursor += 1;
        }

        if (this.isWithinBoundary() == false) {
          deathString = "OUT OF BOUNDARY";
          this._field[prevPosX][prevPosY] = fieldCharacter;
          loop = false;
        } else if (this.foundHole()) {
          this._field[this._xCursor][this._yCursor] = "X";
          this._field[prevPosX][prevPosY] = fieldCharacter;
          loop = false;
          deathString = "FALLING INTO THE HOLE";
        } else if (this.foundHat()) {
          this._field[this._xCursor][this._yCursor] = "8";
          this._field[prevPosX][prevPosY] = fieldCharacter;
          loop = false;
          deathString = "YESS, YOU FOUND THE HAT!";
          hatHasBeenFound = true;
        } else {
          this._field[this._xCursor][this._yCursor] = pathCharacter;
          this._field[prevPosX][prevPosY] = fieldCharacter;
        }
      } else {
        console.log("WRONG KEY PRESSED");
      }
    }
    this.print();
    if (hatHasBeenFound) {
      console.log("==== YOU WIN :) ====");
    } else {
      console.log(`YOU DIED due to ${deathString} (:`);
    }
  }

  static generateField(width, height, percentage) {
    const arr = new Array(height);
    arr.fill(new Array(width)); // fill array, otherwise it will be undefined
    for (let i = 0; i < height; i++) {
      let arr2 = [];
      let countHole = 0;
      for (let j = 0; j < width; j++) {
        const prob = Math.random();
        arr2[j] = prob > percentage ? fieldCharacter : hole;
      }
      arr[i] = arr2;
    }

    // determine hat location at 0,0
    arr[0][0] = pathCharacter;

    // randomly determine hat location
    const xHat = Math.round(Math.random() * width);
    const yHat = Math.round(Math.random() * height);
    // update the hat x,y property
    this._xHat = xHat;
    this._yHat = yHat;
    // update the area array for hat character
    arr[xHat][yHat] = hat;
    return arr;
  }
}

const height = 10;
const width = 10;
const percentage = 0.13;
const mainArea = Field.generateField(width, height, percentage);
const game = new Field(mainArea);
game.start();
