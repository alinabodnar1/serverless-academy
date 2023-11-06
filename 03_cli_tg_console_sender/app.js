const { program } = require("commander");
const TelegramBot = require("node-telegram-bot-api");
process.stdin.setEncoding("utf8");

require("dotenv").config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

// // function sendMessage (message) {

// //   bot.on("message", async (msg) => {
// //     const chatID = msg.chat.id;

// //     return bot.sendMessage(chatID, message);

// //   });
// // }

program
  .version("11.1.0")
  .description("Command line to send messages and images to the Telegram Bot");

program
  .command("m <message>")
  .description("Send a message to the Telegram Bot")
  .action((message) => {
    bot.on("message", (msg) => {
      const text = msg.text;

      if (text === "/start") {
        const chatID = msg.chat.id;

        bot.sendMessage(chatID, message);

        console.log("You successfully sent message to the bot!");
      }
    });
  });

program
  .command("p <photoPath>")
  .description("Send a photo to the Telegram Bot")
  .action(() => {
    bot.on("message", async (msg) => {
      const chatId = msg.chat.id;
      const args = process.argv.slice(2);
      const photo = args[1];
      const text = msg.text;

      if (text === "/start") {
        await bot.sendPhoto(chatId, photo);

        console.log("You successfully sent photo to the bot!");

        process.exit();

        return;
      }
    });
  });

program.parse(process.argv);
