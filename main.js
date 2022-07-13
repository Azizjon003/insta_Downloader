const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const { Telegraf } = require("telegraf");
const { Instagram } = require("social-downloader-cherry");
const fs = require("fs");
const axios = require("axios");
const token = process.env.Token;
const bot = new Telegraf(token);
let son = 0;
bot.command("start", async (msg) => {
  const id = msg.update.message.from.id;
  const name = msg.update.message.from.first_name;

  msg.telegram.sendMessage(id, `Salom ${name} Botimizga xush kelibsiz`, {
    reply_markup: {
      keyboard: [
        [{ text: "Post yuklash" }],
        [{ text: "Profil Rasmini yuklash" }],
      ],
      resize_keyboard: true,
    },
  });
});

bot.on("text", async (msg) => {
  const id = msg.update.message.from.id;
  const name = msg.update.message.from.first_name;
  const text = msg.update.message.text;

  if (text == "Post yuklash") {
    msg.telegram.sendMessage(id, `Post yuklash uchun linkni bizga yuboring`, {
      reply_markup: {
        remove_keyboard: true,
      },
    });
    son = 1;
  } else {
    if (son == 1) {
      const res = await Instagram.getAny(text);
      console.log(res.data);
      const data = await axios.get(res.data.body.link, {
        responseType: "stream",
      });

      if (res.data.body.type == "GraphVideo") {
        await data.data.pipe(fs.createWriteStream(`${__dirname}/${id}.mp4`));
        msg.telegram.sendMessage(
          id,
          `Post yuklandi,U Faylni sizga yuboraylikmi`,
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Ha", callback_data: "haV" }],
                [{ text: "Yoq", callback_data: "yoq" }],
              ],
            },
          }
        );
      }

      if (res.data.body.type == "GraphImage") {
        await data.data.pipe(fs.createWriteStream(`${__dirname}/${id}.jpg`));

        msg.telegram.sendMessage(
          id,
          `Post yuklandi,U Faylni sizga yuboraylikmi`,
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "HaI", callback_data: "ha" }],
                [{ text: "Yoq", callback_data: "yoq" }],
              ],
            },
          }
        );
      }
    }
  }
});
bot.on("callback_query", async (msg) => {
  const text = msg.update.callback_query.data;
  const id = msg.update.callback_query.from.id;
  if (text == "haV") {
    const data1 = fs.readFileSync(`${__dirname}/${id}.mp4`);
    await msg.telegram.sendVideo(id, {
      source: data1,
      filename: `${id}.mp4`,
      remove_keyboard: true,
    });

    son = 0;
  } else {
    if (text == "haI") {
      const data2 = fs.readFileSync(`${__dirname}/files/${id}.jpg`);
      await msg.telegram.sendPhoto(id, {
        source: data2,
        filename: `${__dirname}/files/${id}.jpg`,
        // caption: `https://t.me/Insta_down_aa_bot`,
      });
      son = 0;
    } else msg.telegram.sendMessage(about.id, "PDF yaratilmadi");
  }
});
bot.launch();
