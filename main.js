const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const { Telegraf } = require("telegraf");
const token = process.env.Token;
const bot = new Telegraf(token);
bot.command("start", async (msg) => {
  const id = msg.update.message.from.id;
  const name = msg.update.message.from.first_name;
  msg.telegram.sendMessage(id, `Hello ${name}`);
});
bot.launch();
