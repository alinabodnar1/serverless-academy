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
    validate: function (value) {
      const isValid = value < 100 && value !== "";
      if (isValid) {
        return true;
      } else {
        return "Please enter an age less 100";
      }
    },
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
          console.log(users);
          getUser(users);
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

function getUser(users) {
  const usersString = JSON.stringify(users, null, 2);

  fs.promises
    .writeFile("./db.txt", usersString, "utf8")
    .catch((err) => console.log(err.message));

  fs.promises.readFile("./db.txt", "utf8").then((users) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "Enter the user's name you want to find in DB: ",
        },
      ])

      .then((answers) => {
        const usersObj = JSON.parse(users, null, 2);

        const wanted = usersObj.find(
          (user) =>
            user.userName.toLowerCase() === answers.name.toLowerCase() 
            // user.userName === answers.name
        );

        if (wanted) {
          console.log(`User ${answers.name} was found: `);
          console.log(wanted);
        } else {
          console.log("There is no such user in DB");
        }
      });
  });
}
