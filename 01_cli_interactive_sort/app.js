process.stdin.setEncoding("utf8");

let questions = [
  "1 - Sort words alphabetically (A-Z)",
  "2 - Show numbers from lesser to greater",
  "3 - Show numbers from bigger to smaller",
  "4 - Display words in ascending order by number of letters in the word",
  "5 - Show only unique words",
  "6 - Display only unique values from the set of words and numbers entered by the user",
];

let answers = [];

process.stdout.write("Hello. Enter 10 words or digits deviding them in spaces: ");

process.stdin.on("data", function (data) {
  
  answers.push(data.toString().trim());
 
  console.log("You entered: ", answers);

  questions.forEach((question) => console.log(question));

  process.stdout.write("How to sort input data? \n Select 1 - 6 and press ENTER  >  ");

  const items = answers[0].split(" "); // perforn array into items
  arrayData = items.filter(item => item.trim() !== ""); // remove empty lines
  const words = arrayData.filter(item => isNaN(item));
  const numbers = arrayData.filter(item => !isNaN(item));

  // 1 - Sort words alphabetically (A-Z)
  if (answers.includes("1")) {
    console.log(words.sort());
  } 

  // 2 - Show numbers from lesser to greater
  if (answers.includes("2")) {
    console.log(numbers.sort((a, b) => a - b))
  } 
  // 3 - Show numbers from bigger to smaller
  if (answers.includes("3")) {
    console.log(numbers.sort((a, b) => b - a));
  } 
  // 4 - Display words in ascending order by number of letters in the word
  if (answers.includes("4")) {
    console.log(words.sort((a, b) => a.length - b.length));
  } 

  // 5 - Show only unique words
  if (answers.includes("5")) {
    let uniqueWords = words.filter(
      (word, index, array) => array.indexOf(word) === index
    );
    console.log(uniqueWords);
  } 

  // 6 - Display only unique values from the set of words and numbers entered by the user
  if (answers.includes("6")) {
    let uniqueWords = arrayData.filter(
      (word, index, array) => array.indexOf(word) === index
    );
    console.log(uniqueWords);
  } 

  // exit the program
  if (answers.includes("exit")) {
    process.exit();
  }
});



