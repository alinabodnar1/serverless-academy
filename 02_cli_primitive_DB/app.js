import inquirer from "inquirer";

const questions = [
  {
    type: 'input',
    name: 'userName', // jsts
    message: "Enter the user's name. To cancel press ENTER",
  },
  {
    type: 'list',
    name: 'gender',
    message: "Choose your gender",
    choices: ['male', 'female'],
  },
  {
    type: 'input',
    name: 'age',
    message: "Enter your age",
  }
];

function ask() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      // console.log(answers.userName, '\n');
      console.dir(answers, { colors: true });
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
