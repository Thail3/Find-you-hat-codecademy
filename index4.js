const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor() {
    this.field = [];
    this.current = [0, 0];
  }

  start() {
    console.log("Welcome to Find Your Hat Game!");
    console.log(
      "Reach the hat (^) without falling in the holes (O) or falling off the board."
    );
    this.askQuestion();
  }

  askQuestion() {
    let level = prompt(
      "Which level would you like to play? Please type easy, medium or hard: "
    ).toLowerCase();
    switch (level) {
      case "easy":
        this.generateField(20, 5, 0.3);
        console.log("\nAlright, here is your board:");
        this.print();
        this.direction();
        break;
      case "medium":
        this.generateField(40, 7, 0.6);
        console.log("\nAlright, here is your board:");
        this.print();
        this.direction();
        break;
      case "hard":
        this.generateField(60, 10, 1.2);
        console.log("\nAlright, here is your board:");
        this.print();
        this.direction();
        break;
      default:
        console.log("Invalid level, please try again.");
        this.askQuestion();
        break;
    }
  }

  generateRandom(num) {
    return Math.floor(Math.random() * num);
  }

  generateField(width, height, numHoles) {
    let holes = Math.floor((width + height) * numHoles);
    let colHat = this.generateRandom(width);
    let rowHat = this.generateRandom(height);
    let colStart = this.generateRandom(width);
    let rowStart = this.generateRandom(height);
    // Create field with fieldCharacter
    for (let i = 0; i < height; i++) {
      let widthArray = fieldCharacter.repeat(width).split("");
      this.field.push(widthArray);
    }
    // Populate field with holes
    for (let j = 0; j < holes; j++) {
      let col = this.generateRandom(width);
      let row = this.generateRandom(height);
      this.field[row][col] !== hole ? (this.field[row][col] = hole) : j--;
    }
    // Place hat
    this.field[rowHat][colHat] = hat;
    // Place start at a different position from hat
    while (colStart === colHat) {
      colStart = this.generateRandom(width);
    }
    // Initiate with a random start
    this.current = [rowStart, colStart];
    this.field[rowStart][colStart] = pathCharacter;
    return this.field;
  }

  print() {
    return this.field.forEach((el) => console.log(el.join("")));
  }

  direction() {
    // This for loop iterates according to the this.current numbers, and in the end it sets i and/or j to the this.current number.
    loop1: for (
      let i = this.current[0];
      i < this.field.length;
      i = this.current[0]
    ) {
      loop2: for (
        let j = this.current[1];
        j < this.field[i].length;
        j = this.current[1]
      ) {
        let answer = prompt(
          "Which direction? Type w for up, d for right, s for down, or a for left: "
        );
        answer = answer.toLowerCase();
        if (answer === "d") {
          if (this.field[i][j + 1] === undefined) {
            console.log("You fell off the board! Game over...");
            break loop1;
          } else if (this.field[i][j + 1] === hat) {
            console.log("You won!");
            break loop1;
          } else if (this.field[i][j + 1] === hole) {
            console.log("You lost!");
            break loop1;
          } else {
            this.field[i][j + 1] = pathCharacter;
            this.current = [i, j + 1];
            this.print();
          }
        } else if (answer === "s") {
          if (this.field[i + 1] === undefined) {
            console.log("You fell off the board! Game over...");
            break loop1;
          } else if (this.field[i + 1][j] === hole) {
            console.log("You lost!");
            break loop1;
          } else if (this.field[i + 1][j] === hat) {
            console.log("You won!");
            break loop1;
          } else {
            this.field[i + 1][j] = pathCharacter;
            this.current = [i + 1, j];
            this.print();
            break loop2;
          }
        } else if (answer === "a") {
          if (this.field[i][j - 1] === undefined) {
            console.log("You fell off the board! Game over...");
            break loop1;
          } else if (this.field[i][j - 1] === hat) {
            console.log("You won!");
            break loop1;
          } else if (this.field[i][j - 1] === hole) {
            console.log("You lost!");
            break loop1;
          } else {
            this.field[i][j - 1] = pathCharacter;
            this.current = [i, j - 1];
            this.print();
          }
        } else if (answer === "w") {
          if (this.field[i - 1] === undefined) {
            console.log("You fell off the board! Game over...");
            break loop1;
          } else if (this.field[i - 1][j] === hole) {
            console.log("You lost!");
            break loop1;
          } else if (this.field[i - 1][j] === hat) {
            console.log("You won!");
            break loop1;
          } else {
            this.field[i - 1][j] = pathCharacter;
            this.current = [i - 1, j];
            this.print();
            break loop2;
          }
        } else {
          console.log("Please type a correct direction.");
        }
      }
    }
  }
}

const myField = new Field();
myField.start();
