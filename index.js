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
    if (text == "Profil Rasmini yuklash") {
      msg.telegram.sendMessage(
        id,
        `Profil rasmini yuklash uchun linkni bizga yuboring`,
        {
          reply_markup: {
            remove_keyboard: true,
          },
        }
      );
      son = 2;
    } else {
      if (son == 1) {
        const res = await Instagram.getAny(text);
        console.log(res.data);
        let data = await axios.get(res.data.body.link, {
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
                  [{ text: "Ha", callback_data: "haI" }],
                  [{ text: "Yoq", callback_data: "yoq" }],
                ],
              },
            }
          );
        }
      } else {
        if (son == 2) {
          console.log(text);
          const rasm = await Instagram.getStories(text);
          console.log(rasm.data);
          data = await axios.get(rasm.data.body.profile.profile_pic_url, {
            responseType: "stream",
          });

          await data.data.pipe(fs.createWriteStream(`${__dirname}/${id}.jpg`));

          msg.telegram.sendMessage(
            id,
            `Accaunt rasmi  yuklandi,rasmni sizga yuboraylikmi`,
            {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "Ha", callback_data: "haI" }],
                  [{ text: "Yoq", callback_data: "yoq" }],
                ],
              },
            }
          );
        }
      }
    }
  }
});
bot.on("callback_query", async (msg) => {
  const text = msg.update.callback_query.data;
  const id = msg.update.callback_query.from.id;
  if (text == "haV") {
    const data1 = fs.readFileSync(`${__dirname}/${id}.mp4`);
    await msg.telegram.sendVideo(
      id,
      {
        source: data1,
        filename: `${id}.mp4`,
        remove_keyboard: true,
      },
      {
        caption: "@Insta_down_aa_bot code by [Hack](https://t.me/coder_aa)",
        parse_mode: "markdown",
      }
    );

    son = 0;
  } else {
    if (text == "haI") {
      const data2 = fs.readFileSync(`${__dirname}/${id}.jpg`);
      await msg.telegram.sendPhoto(
        id,
        {
          // caption: "@Insta_down_aa_bot code by @Coder_aa",

          source: data2,
          filename: `${__dirname}/files/${id}.jpg`,
        },
        {
          parse_mode: "HTML",
          caption:
            "@Insta_down_aa_bot code by <a href='https://t.me/coder_aa'>Hack</a>",
        }
      );
      son = 0;
    } else msg.telegram.sendMessage(id, "yuklab olish yaratilmadi");
  }
});
bot.launch();