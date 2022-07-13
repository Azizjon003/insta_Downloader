const axios = require("axios");
const fs = require("fs");
// const cheerio = require("cheerio");

// const getVideo = async (url) => {
//   const html = await axios.get(url);
//   console.log(`html: ${html.data}`);
//   const $ = cheerio.load(html.data);
//   // console.log(`cheerio: ${$}`);
//   const videoString = $("meta[property='og:video']").attr("src");
//   console.log(`videoString: ${videoString}`);
//   fs.writeFileSync("index.html", html.data);
//   return videoString;
// };

// getVideo(
//   "https://www.instagram.com/p/CfoOYvPsQeb/?utm_source=ig_web_copy_link"
// );
// const { Instagram } = require("social-downloader-cherry");
// async function ishla() {
//   const res = await Instagram.getAny(
//     "https://www.instagram.com/p/Cf60lQoodO-/?utm_source=ig_web_copy_link"
//   );
//   const story = await Instagram.getStories(
//     "zavqiddin_0802"
//     // "https://www.instagram.com/stories/zavqiddin_0802/2880862131495031253/?igshid=MDJmNzVkMjY%3D"
//   );

//   console.log(res.data);

//   console.log("ishla");
//   console.log(story.data);
//   console.log("askhasbsahj");

//   const highlights = await Instagram.getStories(
//     "zavqiddin_0802"
//     // "https://www.instagram.com/stories/zavqiddin_0802/2880862131495031253/?igshid=MDJmNzVkMjY%3D"
//   );
//   const data = await axios.get(res.data.body.link, { responseType: "stream" });

//   await data.data.pipe(fs.createWriteStream(`${__dirname}/ishla.jpg`));
// }
// ishla();

// 5461669985:AAFzrXUqOaG1eMzt_XfLhSvCwYcMppSfjLU
//5461669985:AAFzrXUqOaG1eMzt_XfLhSvCwYcMppSfjLU
