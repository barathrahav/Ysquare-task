const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");

const add = express();
add.use(cors({ origin: "*" }));
add.use(bodyparser.json());
add.use(express.json());
add.use(bodyparser.urlencoded({ extended: true }));
add.use(express.static("public"));

let conn = mysql.createConnection({
  hoost: "localhost",
  port: "3306",
  user: "root",
  password: "B@rata1708",
  database: "ysquare",
});

conn.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("db connected successfully");
  }
});

let counter = 23000;

function generateCustomID() {
  counter++;
  return `YS${counter.toString().padStart(5, "0")}`;
}

//create user data in db
add.post("/create", (request, response) => {
  const user = {
    user_id: generateCustomID(),
    created_date: new Date(),
    updated_date: new Date(),
    isAdmin: 0,
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    password: request.body.password,
  };

  const insertQuery = "INSERT INTO employee_details SET ?";
  conn.query(insertQuery, user, (error, result) => {
    if (error) {
      response.send(error);
    } else {
      response.send("User added successfully");
    }
  });
});

// Login user with their user_id and password
add.post("/login", (request, response) => {
  const { user_id, password } = request.body;

  const loginQuery =
    "SELECT * FROM employee_details WHERE user_id = ? AND password = ?";

  conn.query(loginQuery, [user_id, password], (error, result) => {
    if (error) {
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length === 0) {
        response.status(401).json({ error: "Invalid user_id or password" });
      } else {
        response.json({ message: "Login successful", user: result[0] });
      }
    }
  });
});

// Fetch all employee details from the database
add.get("/empdetails", (request, response) => {
  const selectQuery = "SELECT * FROM employee_details";

  conn.query(selectQuery, (error, result) => {
    if (error) {
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      response.json(result);
    }
  });
});

// Update user data in db
add.put("/users/:user_id", (request, response) => {
  const user_id = request.params.user_id;
  const updatedData = {
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    password: request.body.password,
    ph_no: request.body.ph_no,
    dob: request.body.dob,
    age: request.body.age,
    gender: request.body.gender,
    city: request.body.city,
    emergency_contact: request.body.emergency_contact,
    emergency_ph_no: request.body.emergency_ph_no,
    dept: request.body.dept,
    job_title: request.body.job_title,
    salary: request.body.salary,
    isAdmin: request.body.isAdmin,
  };

  const updateQuery = "UPDATE employee_details SET ? WHERE user_id = ?";
  conn.query(updateQuery, [updatedData, user_id], (error, result) => {
    if (error) {
      response.status(500).json({ error: "Internal Server Error" });
    } else {
      response.json({ message: "User data updated successfully" });
    }
  });
});

// this is command is to make node to run in port 4004
add.listen(4004, () => {
  console.log("node is running under 4004 port");
});
