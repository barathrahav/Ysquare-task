import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import laptop from "./laptop.png";
import axios from "axios";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

function Landing() {
  const [user_id, setUser_id] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginData = {
      user_id: user_id,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:4004/login",
        loginData
      );
      console.log(response.data);
      navigate("/Empdashboard");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="Landingbg d-flex align-items-center justify-content-center">
      <div className="Landingcontainer rounded-4 p-4">
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0 d-flex align-items-center">
            <img
              src={laptop}
              alt="laptop"
              className="laptop img-fluid mx-auto d-block"
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <h2 className="card-title">Login</h2>
            <div className="input-group mb-3 w-75 mt-3">
              <span
                className="input-group-text rounded-start-pill"
                id="basic-addon1"
              >
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="text"
                className="form-control rounded-end-pill"
                placeholder="Email"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={user_id}
                onChange={(e) => setUser_id(e.target.value)}
              />
            </div>
            <div className="input-group mb-3 w-75 mt-3">
              <span
                className="input-group-text rounded-start-pill"
                id="basic-addon1"
              >
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                className="form-control rounded-end-pill"
                placeholder="Password"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-success p-2 m-3 w-50 rounded-5"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
