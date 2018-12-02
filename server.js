const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

const app = express();

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected!");

  // Setting up the database
  con.query("use employees", (err, result) => {
    if (err) throw err;
  });
});

app.use(require("cors")());

//this is needed to get POST parameters
app.use(require("body-parser").json());

// APIs

app.get("/api/salary", (req, res) => {
  let query = "select * from salaries where emp_no = " + req.query.id;
  con.query(query, (err, result) => {
    if (err) throw err;

    res.send(result);
    console.log("/api/salary/" + req.params.id);
  });
});

app.get("/api/employee/:id", (req, res) => {
  let query = "select * from employees where emp_no = " + req.params.id;
  con.query(query, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

app.get("/api/employee", (req, res) => {
  let query =
    "select * from employees where last_name like '%" + req.query.q + "%'";
  con.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// @route POST api/salary/:id
// @desc Add a new salary for an employee
app.post("/api/salary/add", (req, res) => {
  let query =
    "insert into salaries values ('" +
    req.body.id +
    "','" +
    req.body.salary +
    "','" +
    req.body.startDate +
    "','" +
    req.body.endDate +
    "')";
  con.query(query, (err, result) => {
    try {
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  });
});

app.listen(5000, () => console.log("Server running"));
