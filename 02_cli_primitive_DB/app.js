import inquirer from "inquirer";
import fs from "fs";

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
      switch (choices.choice) {
        case "Yes":
          console.log("Users inside choises:", users);
          writeToDB(users);
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

function writeToDB(users) {
  let usersString = JSON.stringify(users);

  fs.promises
    .appendFile("./db.txt", usersString, "utf-8")
    .catch((err) => console.log(err.message));

  fs.promises.readFile("./db.txt", "utf-8").then((users) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Enter the user's name you want to find in DB: ",
        },
      ])

      .then((answers) => {
        // let usersObject = JSON.parse(usersString);
        console.log("--------------------------------");

        const usersObj = JSON.parse(users);

        console.log("usersObj:", usersObj);

        const foundedName = usersObj.find(
          user => user.userName === answers.name);
            // console.log('user.userName:', user.userName);
            // console.log('answers.name:', answers.name);

            
        console.log("foundedName:", foundedName);

        if (foundedName != [] || foundedName != undefined || foundedName != null) {
          return console.log(`User ${answers.name} was found`);
        }
        return console.log(`There is no User ${answers.name} in DB`);
      });
  });
}

// function findUser(users){
//   inquirer
//   .prompt([
//     {
//       type: "input",
//       name: "userName",
//       message: "Enter the user's name you want to find in DB: ",
//     },
//   ])

//   .then((answers) => {
//     if (answers.userName === "") {
//       tapEnter(users);
//       return;
//     }

//   });

// }
