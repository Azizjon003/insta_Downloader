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

  msg.telegram.sendMessage(
    id,
    `Salom ${name} Botimizga xush kelibsiz\n Bizni qo'llab quvvatlab kanalimizga obuna bo'ling @ubuntulinuxaau`,
    {
      reply_markup: {
        keyboard: [
          [{ text: "Post yuklash" }],
          [{ text: "Profil Rasmini yuklash" }],
        ],
        resize_keyboard: true,
      },
    }
  );
  son = 0;
});
bot.command("tags", async (msg) => {
  const id = msg.update.message.from.id;
  const name = msg.update.message.from.first_name;
  msg.telegram.sendMessage(id, `${name} instagramdagi #hashtagni yuboring`, {
    remove_keyboard: true,
  });
  son = 3;
});
bot.on("text", async (msg) => {
  try {
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
          `Profil rasmini yuklash uchun accaunt nomini bizga yuboring:Masalan cristiano`,
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
          if (res.hasError) {
            msg.telegram.sendMessage(id, `Dasturda xatolik bor`, {
              reply_markup: {
                remove_keyboard: true,
              },
            });
            return;
          }
          let data = await axios.get(res.data.body.link, {
            responseType: "stream",
          });

          if (res.data.body.type == "GraphVideo") {
            await data.data.pipe(
              fs.createWriteStream(`${__dirname}/${id}.mp4`)
            );
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
            await data.data.pipe(
              fs.createWriteStream(`${__dirname}/${id}.jpg`)
            );

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

            if (rasm.hasError) {
              msg.telegram.sendMessage(id, `Dasturda xatolik bor`, {
                reply_markup: {
                  remove_keyboard: true,
                },
              });
              return;
            }
            console.log(rasm.data);
            data = await axios.get(rasm.data.body.profile.profile_pic_url, {
              responseType: "stream",
            });

            await data.data.pipe(
              fs.createWriteStream(`${__dirname}/${id}.jpg`)
            );

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
          } else {
            if (son == 3) {
              const base_url = "https://www.instagram.com/";
              const url = base_url + "explore/tags/" + text + "?__a=1";

              axios
                .get(url)
                .then((response) => {
                  console.log(response);
                  response.data.graphql.hashtag.edge_hashtag_to_media.edges.map(
                    (post) => {
                      if (!fs.existsSync(`./files/${text}`)) {
                        fs.mkdirSync(`./files/${text}`, { recursive: true });
                      }
                      const file = fs.createWriteStream(
                        `./files/${text}/${post.node.shortcode}.jpg`
                      );
                      const request = https.get(
                        post.node.display_url,
                        function (response) {
                          response.pipe(file);
                        }
                      );
                    }
                  );
                })
                .catch((err) => {
                  console.log(err);
                });

              son = 0;
            }
          }
        }
      }
    }
  } catch (err) {
    msg.telegram.sendMessage(id, `Dasturda xatolik bor`, {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  }
});
bot.on("callback_query", async (msg) => {
  try {
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
          caption:
            "@Insta_down_aa_bot code by <a href='https://t.me/coder_aa'>Hack</a>",
          parse_mode: "HTML",
          reply_markup: {
            keyboard: [
              [{ text: "Post yuklash" }],
              [{ text: "Profil Rasmini yuklash" }],
            ],
            resize_keyboard: true,
          },
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
            reply_markup: {
              keyboard: [
                [{ text: "Post yuklash" }],
                [{ text: "Profil Rasmini yuklash" }],
              ],
              resize_keyboard: true,
            },
          }
        );
        son = 0;
      } else msg.telegram.sendMessage(id, "yuklab olish yaratilmadi");
    }
  } catch (err) {
    msg.telegram.sendMessage(
      id,
      `Dasturda xatolik bor /start buyrug'ini bering`,
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );
  }
});

bot.catch((err, msg) => {
  const id = msg.from.id;
  msg.telegram.sendMessage(
    id,
    `Dasturda xatolik bor /start buyrug'ini ishlating`,
    {
      reply_markup: {
        remove_keyboard: true,
      },
    }
  );
});
bot.launch();
