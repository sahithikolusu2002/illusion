var express = require("express");
var app = express();
var alert = require("alert");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
const request = require("request");
var serviceAccount = require("./serviceAccountKey.json");

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
  credential: cert(serviceAccount),
});
const path = require("path");
const { futimes } = require("fs");
const port = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, "public")));
const db = getFirestore();
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/song.html");
});
app.get("/signup", function (req, res) {
  res.sendFile(__dirname + "/song.html");
});
app.get("/dashboard", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/signup1info", function (req, res) {
  db.collection("music")
    .add({
      firstname: req.query.firstname,
      lastname: req.query.lastname,
      email: req.query.email,
      password: req.query.password,
    })
    .then(() => {
      res.sendFile(__dirname + "/song.html");
    });
});

app.get("/login1info", function (req, res) {
  var user = req.query.email;
  var pass = req.query.password;
  // console.log(user);
  // console.log(pass);
  db.collection("music")
    .get()
    .then(function (docs) {
      var flag = 0;
      docs.forEach((doc) => {
        if (user == doc.data().email && pass == doc.data().password) {
          flag = 1;
        }
      });
      if (flag == 1) {
        res.sendFile(__dirname + "/index.html");
      } else {
        alert("Incorrect credentials details...");
        //res.sendFile(__dirname + "/error.html");
      }
    });
});
app.post("/authenticate", (req, res) => {
  // Handle authentication logic here
  res.sendFile(__dirname + "/index.html");
});

// app.get("/error1", function (req, res) {
//   res.redirect("/login");
// });
// app.get("/intro1", function (req, res) {
//   res.redirect("/login");
// });

app.listen(3000);
