const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1 style='text-align: center'>API Crawl by Yuiichann</h1>");
});

app.use("/search", require("./routes/searchRoute"));

app.listen(PORT, () => {
  console.log(`App start at PORT http://localhost:${PORT}`);
});
