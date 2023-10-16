const mysql = require("mysql2");
const express = require("express");
const app = express();
const logger = require("morgan");

// view template engine
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// create the connection to database
const conn = mysql.createConnection({
  host: "localhost",
  user: "kjca1117",
  password: "kjca24106!",
  database: "contact",
  dateStrings: "date",
});

// simple query
conn.query("SELECT * FROM contact.contacts", function (err, results, fields) {
  console.log(results); // 서버로부터 반환되는 결과행
});

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
// login
app.get("/signin", (req, res) => {
  res.render("login");
});
// join
app.get("/signup", (req, res) => {
  res.render("join");
});
app.post("/contactAdd", (req, res) => {
  // 등록하려는 문의 정보를 서버로 전송!
  let type = req.body.type == 1 ? "요청" : "문의"; // 구분
  let name = req.body.name; // 이름
  let phone = req.body.phone; // 연락처
  let email = req.body.email; // 이메일
  let title = req.body.title; // 제목
  let memo = req.body.memo; // 내용
  //console.log(type, name, phone, email, title, memo);
  let sql = `INSERT INTO contact.contacts (gubun, name, phone, email, title, memo, regdate)
  VALUES ('${type}', '${name}', '${phone}', '${email}', '${title}', '${memo}', DATE_FORMAT(now(), '%y/%m/%d'))`;

  // query 실행명령
  conn.query(sql, function (err, results, fields) {
    if (err) throw error;
    console.log("정상적으로 데이터가 입력 되었습니다.");
    res.send("<script>alert('등록되었습니다'); location.href='/';</script>");
  });
});
// 삭제용 쿼리를 작성 :3000/contactDel?id=1
app.get("/contactDel", (req, res) => {
  let del_no = req.query.id;
  console.log("삭제하려는 문의 번호 : " + del_no);
  let sql = `DELETE from contact.contacts WHERE id=${del_no}`;
  // query 실행명령
  conn.query(sql, function (err, results, fields) {
    if (err) throw error;
    console.log("문의가 삭제되었습니다."); //
    res.send(
      "<script>alert('삭제 되었습니다'); location.href='/contactList';</script>"
    );
  });
});
app.get("/contactList", (req, res) => {
  // http://localhost/contactList 접속하는 방법
  let sql = "SELECT * FROM contact.contacts ORDER BY id DESC;";
  conn.query(sql, function (err, results, fields) {
    //console.log(results); // results contains rows returned by server
    res.render("contactList", { dataset: results });
  });
});

app.post("/userAdd", (req, res) => {
  console.log(req.body);
});
app.listen(3000, () => {
  console.log("server is listening on port : 3000!");
});
