import inquirer from "inquirer";

const questions = [
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
];

function tapEnter() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Would you search values in DB? ",
        choices: ["Yes", "No"],
      },
    ])

    .then((choices) => {
      console.log("choices:", choices);
      switch (choices.choice) {
        case "Yes":
          console.log("show DB");
          break;
        case "No":
          exit();
          break;
      }
    });
}

function askNextQuestions() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      console.dir(answers, { colors: true });
      firstQuestion();
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(`Prompt couldn't be rendered in the current environment`);
      } else {
        console.log("Something else went wrong");
      }
    });
}

function firstQuestion() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "userName",
        message: "Enter the user's name. To cancel press ENTER ",
      },
    ])

    .then((answers) => {

      if (answers.userName === "") {
        // show DB
        tapEnter();
        return;
      }
      askNextQuestions();
    });
}

function exit() {
  console.log("\n Good bye! Come back again! \n ");
  process.exit();
}

firstQuestion();
