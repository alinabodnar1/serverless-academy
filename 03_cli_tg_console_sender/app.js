const { program } = require("commander");
const TelegramBot = require("node-telegram-bot-api");
process.stdin.setEncoding("utf8");

require("dotenv").config();

const chatID = process.env.chatID;
const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

program
  .version("11.1.0")
  .description("Command line to send messages and images to the Telegram Bot");

program
  .command("message <message>")
  .alias("m")
  .description("Send a message to the Telegram Bot")
  .action(async (message) => {
    await bot.sendMessage(chatID, message).then(() => {
      setTimeout(() => {
        process.exit();
      }, 1000);
    });
    console.log("You successfully sent message to the bot!");
  });

program
  .command("photo <path>")
  .description("Send a photo to the Telegram Bot")
  .alias("p")
  .action(async (path) => {
    await bot.sendPhoto(chatID, path).then(() => {
      setTimeout(() => {
        process.exit();
      }, 1000);
    });
    console.log("You successfully sent photo to the bot!");
  });

program
  .command("--help")
  .description("Show help")
  .action(() => {
    program.help();
  });

program.parse(process.argv);
