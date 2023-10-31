import inquirer from "inquirer";

let users = [];

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

function tapEnter(users) {
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
          console.log("USERS:", users);
          break;
        case "No":
          exit();
          break;
      }
    });
}
function firstQuestion() {
  let name;

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
        tapEnter(users);
        return;
      }

      name = answers.userName;

      askNextQuestions(name);
    });
}

function askNextQuestions(name) {
  inquirer
    .prompt(questions)
    .then((answers) => {
      answers.userName = name;
      users.push(answers);

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

function exit() {
  console.log("\n Good bye! Come back again! \n ");
  process.exit();
}

firstQuestion();
