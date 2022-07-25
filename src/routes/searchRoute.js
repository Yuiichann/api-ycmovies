const router = require("express").Router();
const cheerio = require("cheerio");
const request = require("request-promise");

const crwalData = (key, callback) => {
  let data = [];

  request(
    `https://ophim.cc/tim-kiem?keyword=${encodeURI(key)}`,
    (error, response, html) => {
      if (response.statusCode == 200) {
        const $ = cheerio.load(html);

        $("tbody tr").each((index, el) => {
          const slug = $(el).find("a").attr("href");
          const name = $(el).find("a").find("h3").text();
          const origin_name = $(el).find("a").find("h4").text();

          if (slug) {
            data.push({ slug: slug.split("/")[2], name, origin_name });
          }
        });

        callback(data);
      } else {
        console.log(error);
      }
    }
  );
};

router.get("/:keyword", (req, res) => {
  const keyword = req.params.keyword;

  try {
    crwalData(keyword, (response) => {
      res.json(response);
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
});

module.exports = router;
