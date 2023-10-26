import inquirer from "inquirer";
// import { appendFileSync, readFileSync } from "fs";

const questions = [
  {
    type: "input",
    name: "userName",
    message: "Enter the user's name. To cancel press ENTER",
  },
  {
    type: "list",
    name: "gender",
    message: "Choose your gender",
    choices: ["male", "female"],
  },
  {
    type: "input",
    name: "age",
    message: "Enter your age",
  },
  {
    type: "confirm",
    name: "checked",
    message: "Would you search values in DB",
    default: true,
  },
];

function ask() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      // console.log(answers.userName, '\n');
      console.dir(answers, { colors: true });

      // appendFileSync(
      //   "./db.txt",
      //   `Users: ${answers}`,
      //   {flag: 'a'}
      // );

      const first = readFileSync("./content/first.txt", "utf-8");
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log(`Prompt couldn't be rendered in the current environment`);
      } else {
        // Something else went wrong
        console.log("Something else went wrong");
      }
    });
}

ask();

// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// function askQuestion() {
//   rl.question("Enter your name: ", (rlAnswer) => {
//     console.log(`Hello, ${rlAnswer}!`);
//     // Ask the next question after the user presses Enter

//     askQuestion();
//   });
// }

// askQuestion();
