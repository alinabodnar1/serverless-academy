const readline = require("readline");

let questions = [
  "1 - Sort words alphabetically (A-Z)",
  "2 - Show numbers from lesser to greater",
  "3 - Show numbers from bigger to smaller",
  "4 - Display words in ascending order by number of letters in the word",
  "5 - Show only unique words",
  "6 - Display only unique values from the set of words and numbers entered by the user",
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask() {
  rl.question(
    "Hello. Enter 10 words or digits deviding them in spaces: ",
    (answers) => {
      questions.forEach((question) => console.log(question));

      if (answers === "exit") exit();

      question(answers);
    }
  );
}

function question(answers) {
  rl.question(
    "How to sort input data? \n Select 1 - 6 and press ENTER ",
    (userChoice) => {
      const data = answers.split(" "); 
      dataArray = data.filter((item) => item.trim() !== ""); 

      const words = dataArray.filter((item) => isNaN(item));
      const numbers = dataArray.filter((item) => !isNaN(item));

      if (userChoice === "1") {
        console.log("Sorted words:", words.sort());
        ask();
      } else if (userChoice === "2") {
        console.log(numbers.sort((a, b) => a - b));
        ask();
      } else if (userChoice === "3") {
        console.log(numbers.sort((a, b) => b - a));
        ask();
      } else if (userChoice === "4") {
        console.log(words.sort((a, b) => a.length - b.length));
        ask();
      } else if (userChoice === "5") {
        let uniqueWords = words.filter(
          (word, index, array) => array.indexOf(word) === index
        );
        console.log(uniqueWords);
        ask();
      } else if (userChoice === "6") {
        let uniqueValues = dataArray.filter(
          (word, index, array) => array.indexOf(word) === index
        );
        console.log(uniqueValues);
        ask();
      } else if (userChoice === "exit") exit();
    }
  );
}

function exit() {
  console.log("\n Good bye! Come back again! \n ");
  process.exit();
}

ask();