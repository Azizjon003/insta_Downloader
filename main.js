const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const { Telegraf } = require("telegraf");
const token = process.env.Token;
const bot = new Telegraf(token);
const Downloader = require("instagram-url-downloader").default;
const Util = require("instagram-url-downloader").Util;
const link = `https://scontent.cdninstagram.com/v/t50.16885-16/292320074_571754937755558_3381482003623602391_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjcyMC5pZ3R2LmJhc2VsaW5lIiwicWVfZ3JvdXBzIjoiW1wiaWdfd2ViX2RlbGl2ZXJ5X3Z0c19vdGZcIl0ifQ&_nc_ht=instagram.ftas2-2.fna.fbcdn.net&_nc_cat=102&_nc_ohc=evxvMtn2XvcAX-v6xcU&edm=ALQROFkBAAAA&vs=405832474668222_4281050694&_nc_vs=HBksFQAYJEdFcHpiQkdtcC1ZUkFnZ0NBTmRvWEdqM2JfMHVidlZCQUFBRhUAAsgBABUAGCRHSEE5Y3hFZFZkX2pkWm9DQVBoOF93WmFPSklDYnZWQkFBQUYVAgLIAQAoABgAGwGIB3VzZV9vaWwBMRUAACaYkMue9YjePxUCKAJDMywXQEgd0vGp%2B%2BcYEmRhc2hfYmFzZWxpbmVfMV92MREAdewHAA%3D%3D&ccb=7-5&oe=62CDE10C&oh=00_AT-PzuGlLSz9Uk-B4fK6k4Nw45JepNVE-BVgDOLgiYIMmw&_nc_sid=30a2ef`;
const linkProfil =
  "https://instagram.ftas1-2.fna.fbcdn.net/v/t51.2885-19/290626391_738694513944132_1878688716806227105_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.ftas1-2.fna.fbcdn.net&_nc_cat=100&_nc_ohc=GQ7QfOjjuWkAX8mWv7b&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AT-hZ1yfXFcGmYXx5dxPYeTlr3HkPbsnexK9Y7vjTAVdaw&oe=62D21B73&_nc_sid=8fd12b";
bot.command("start", async (msg) => {
  const id = msg.update.message.from.id;
  const name = msg.update.message.from.first_name;
  //instagram.ftas1-2.fna.fbcdn.net/v/t51.2885-19/290626391_738694513944132_1878688716806227105_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.ftas1-2.fna.fbcdn.net&_nc_cat=100&_nc_ohc=GQ7QfOjjuWkAX8mWv7b&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AT-hZ1yfXFcGmYXx5dxPYeTlr3HkPbsnexK9Y7vjTAVdaw&oe=62D21B73&_nc_sid=8fd12b
  https: msg.telegram.sendMessage(
    id,
    `Hello ${name},fdwbbjsdfsd   kljbnsalkjsdba   ${linkProfil}`,
    {
      reply_markup: {
        keyboard: [
          [{ text: "Post va Storiya yuklash 🤪A" }],
          [{ text: "Profil Rasmini yuklash 😜A" }],
        ],
        resize_keyboard: true,
      },
    }
  );
});
bot.launch();
