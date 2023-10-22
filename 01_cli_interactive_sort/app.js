process.stdin.setEncoding("utf8");

console.log("Hello. Enter 10 words or digits deviding them in spaces:");

let questions = [
  "1 - Sort words alphabetically (A-Z)",
  "2 - Show numbers from lesser to greater",
  "3 - Show numbers from bigger to smaller",
  "4 - Display words in ascending order by number of letters in the word",
  "5 - Show only unique words",
  "6 - Display only unique values from the set of words and numbers entered by the user"
]

let answers = [];

process.stdin.on("data", function(data){
  answers.push(data.toString().trim());

console.log("You entered: ", answers); 
 console.log(`How to sort input data?`);

  questions.forEach(question => console.log(question));
  process.stdout.write("Select 1 - 6 and press ENTER  >  ");

  const items = answers[0].split(' '); // perforn array into items
  arraySymbols = items.filter(element => element.trim() !== ''); // remove empty lines

  // 1 - Sort words alphabetically (A-Z)
  if (answers.includes("1")) {
    console.log('Sorted answers:', arraySymbols.sort()); 
  }

  // 2 - Show numbers from lesser to greater
  if (answers.includes("2")) {

    console.log('Sorted answers:', arraySymbols.sort((a, b) => a - b)); 
  }

  if (answers.includes("2")) {
    console.log('Sorted answers:', arraySymbols.sort((a, b) => a - b)); 
  }
  // exit the program
  if (answers.includes("exit")) {
    process.exit();
  }

});

