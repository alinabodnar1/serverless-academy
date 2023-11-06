const {program} = require("commander");
const TelegramBot = require("node-telegram-bot-api");

require("dotenv").config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Greeting" },
    { command: "/info", description: "Get info about user" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatID = msg.chat.id;

    if (text === "/start") {
      await bot.sendMessage(
        chatID,
        "https://stickerswiki.ams3.cdn.digitaloceanspaces.com/GoorbehVS2/55394.512.mp4"
      );
      return bot.sendMessage(chatID, `Welcome to alinaB's bot: ${text}`);
    }
  
    if (text === "/info") {
      return bot.sendMessage(
        chatID,
        `Your name is ${msg.from.first_name} ${msg.from.last_name}`
      );
    }
    return bot.sendMessage(chatID, "I do not understand you, try again!");
  });
};

start();