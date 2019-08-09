const express = require("express");
const mysql = require("mysql");
const app = express();


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'vuminhkhoi1802',
  password: 'Trang19082008!',
  database: 'synker',
})


connection.connect((err) => {
  if (err) {
    console.log('Database Connection Error');
    throw err;

  }
  console.log('Connected to database');
});

global.db = connection;


app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/js'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.get('/', function (req, res) {
  6
  res.render('index.html');
});

app.get('/get_from_db', function (req, res) {
  connection.query("SELECT * from content", function (err, rows) {
    // var fs = require('fs');
    // fs.writeFile('./js/content.json', JSON.stringify(rows), function(err) {
    //   if (err) throw err;
    //   console.log('Saved to JSON file')
    // })
    // res.json(rows[0]);

  });
});

app.get('/ping', function (req, res) {
  res.json({
    "alive": "yes"
  });
});

app.get('/update', function (req, res) {
  var content = req.query.data;
  /*Check if there is any row else put one row for all time*/
  connection.query("SELECT * from content", function (err, rows, field) {
    if (rows.length === 0) {
      /*add one row*/
      connection.query("INSERT into content(user_id,content) VALUES (1,'')", function (err, rows) {
        if (err) {
          console.log(err);
          res.json({
            "error": "1"
          });
        } else {
          res.json({
            "yes": "1"
          });
        }
      });
    } else {
      /*Sync exisiting data*/
      connection.query("UPDATE content set content='" + content + "' where user_id=1", function (err, rows) {
        if (err) {
          console.log(err);
          res.json({
            "error": "1"
          });
        } else {
          res.json({
            "yes": "1"
          });
        }
      });
    }
  });
});

app.get('/')

app.listen(3000, function () {

  console.log("I am live at PORT 3000.");

});