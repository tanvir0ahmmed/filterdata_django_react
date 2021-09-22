import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ApiService from "./ApiService";
const Registration = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  let history = useHistory();
  const handleLogin = () => {
    ApiService.AddUser({ username, password })
      .then((response) => {
        console.log("Response:", response);
        if (response.error === "error") history.push("/register");
        else history.push("/");
      })
      .catch((error) => console.log("ERR", error));

    console.log("up::", username, password);
  };

  const handleSwitch = () => {
    history.push({
      pathname: "/",
      //mydata:logData
    });
  };
  return (
    <div className="container m-3 ">
      <div className="row">
        <div
          className="col-md-12 w-50"
          style={{ marginLeft: "50%", marginTop: "10%" }}
        >
          <div className="card">
            <h1 className="card-title p-3 text-center">Register</h1>
            <div className="card-body">
              <div className="inp-field">
                <label className="form-label" for="inp">
                  username
                </label>
                <input
                  type="text"
                  className="text-left form-control"
                  id="inp"
                  value={username}
                  placeholder="type your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="inp-field">
                <label className="form-label" for="pass">
                  password
                </label>
                <input
                  type="password"
                  className="text-left form-control"
                  id="pass"
                  value={password}
                  placeholder="type your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="button"
                className="btn btn-primary"
                value="Create"
                onClick={handleLogin}
              />
              <span className="switch" onClick={handleSwitch}>
                Go to Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
