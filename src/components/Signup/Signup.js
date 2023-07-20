import React from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const insert = async (event) => {
    event.preventDefault();
    var value = { Headers: { enctype: "multipart/form-data" } };
    var first_name = document.getElementById("first_name").value;
    var last_name = document.getElementById("last_name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var key = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    };
    if (first_name === "") {
      window.alert("first name is empty");
    } else if (last_name === "") {
      window.alert("last name is Empty");
    } else if (email === "") {
      window.alert("email is empty");
    } else if (password === "") {
      window.alert("password is empty");
    } else {
      await axios
        .post("http://localhost:4004/create", key, value)
        .then(function (res) {
          if (res.data.status === "error") {
            window.alert("Data is not inserted");
            window.location.reload();
          } else if (res.data.status === "success") {
            window.alert("Data is Inserted");
            window.location.href = "/view";
          }
          console.log(res.data);
        })
        .catch(function (error) {
          window.alert("An error occurred while submitting the form.");
          console.log(error);
        });
    }
  };
  return (
    <div className="Signupbg d-flex align-items-center justify-content-center">
      <div className="Signupcontainer rounded-4 text-center p-5">
        <h1 className="mb-3">Signup</h1>
        <form onSubmit={insert}>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Enter Your First Name"
            className="mb-5"
          />
          <br />
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Enetr Your Last name"
            className="mb-5"
          />
          <br />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            className="mb-5"
          />
          <br />
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            className="mb-5"
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
