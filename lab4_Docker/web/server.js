//OPLOSSING ONLINE HALEN< DEZE VERSIE WERKT NIET

var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');

var connectiondb = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'password',
    database: 'employees'
});

var app = express();

// Static file hosting
app.use(express.static('client'));
app.use(bodyparser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/employees', function (req, res) {
    connectiondb.query('SELECT * FROM employees', function (error, results, fields) {
        if(error){
            console.log("Error with connection: " + error);
            res.status(500).json(null);
            return;
        }
        res.status(200).json(results);
        
    });
});

app.get('/api/id', function (req, res) {
    connectiondb.query('SELECT * FROM employees WHERE emp_no = ' + req.params.id, function (error, results, fields) {
        if(error){
            console.log("Error with connection: " + error);
            res.status(500).json(null);
            return;
        }
        res.status(200).json(results);
    })
    
})

app.listen(3000);
