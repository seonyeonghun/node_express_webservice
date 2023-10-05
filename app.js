const express = require("express");
const app = express();

// view template engine
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(express.static('public'));

// routing : 경로에 해당하는 파일을 지정하는 방법
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/portfolio", (req, res) => {
  res.render("portfolio");
});
app.get("/contact", (req, res) => {
  res.render("contact"); // help.pug 찾아서 서버에서 렌더링해라!
});

app.listen(3000, () => {
  console.log("server is listening on port : 3000!");
});
