const axios = require("axios");
const https = require("https");
const fs = require("fs");

const base_url = "https://www.instagram.com/";

let tag = "",
  post = "";
let tagPref = "explore/tags/",
  postPref = "p/";

process.argv.slice(2).map((arg) => {
  if (arg.includes("--tag")) tag = arg.split("=")[1];
  else if (arg.includes("--post")) post = arg.split("=")[1];
});

function getTag() {
  const url = base_url + (tag ? tagPref : postPref) + (tag || post) + "?__a=1";
  console.log(url);
  axios
    .get(url)
    .then((response) => {
      response.data.graphql.hashtag.edge_hashtag_to_media.edges.map((post) => {
        if (!fs.existsSync(`./files/${tag}`)) {
          fs.mkdirSync(`./files/${tag}`, { recursive: true });
        }
        console.log(post);
        const file = fs.createWriteStream(
          `./files/${tag}/${post.node.shortcode}.jpg`
        );
        const request = https.get(post.node.display_url, function (response) {
          response.pipe(file);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getPost() {
  const url = base_url + (tag ? tagPref : postPref) + (tag || post) + "?__a=1";
  console.log(url);
  axios
    .get(url)
    .then((response) => {
      console.log(response);
      // console.log(response.data.graphql.shortcode_media.display_url);

      const file = fs.createWriteStream(`./files/${tag || post}.jpg`);
      const request = https.get(
        response.data.graphql.shortcode_media.display_url,
        function (response) {
          response.pipe(file);
        }
      );
    })
    .catch((err) => {
      console.error(err);
    });
}

tag ? getTag() : getPost();
