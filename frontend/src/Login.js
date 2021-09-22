import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import ApiService from "./ApiService";
const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useCookies(["mytoken"]);
  let history = useHistory();

  useEffect(() => {
    if (token["mytoken"]) {
      history.push({
        pathname: "/home",
      });
    } else {
      history.push("/");
    }
  }, [token, history]);

  const handleLogin = () => {
    console.log("up::", username, password);

    ApiService.LogIn({ username, password })
      .then((response) => LogData(response))
      .catch((error) => {
        console.log("Errro", error);
      });

    history.push({
      pathname: "/home",
    });
  };

  const LogData = (response) => {
    if ("error" in response) {
      console.log("Errro", response);
    } else {
      setToken("mytoken", response.token);
    }
  };

  const handleSwitch = () => {
    history.push({
      pathname: "/register",
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
            <h1 className="card-title p-3 text-center">Login</h1>
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
                value="Login"
                onClick={handleLogin}
              />
              <span className="switch" onClick={handleSwitch}>
                Create Account
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
