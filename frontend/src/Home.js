import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ApiService from "./ApiService";
import { useCookies } from "react-cookie";
import queryString from "query-string";
const Home = () => {
  console.log("home js");
  const [results, setResult] = useState(null);
  const [inpValue, setInpValue] = useState("");
  const [srcValue, setSrcValue] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [uid, setUid] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [token, setToken, removeToken] = useCookies(["mytoken"]);

  let history = useHistory();

  useEffect(() => {
    if (token["mytoken"]) {
      const queries = queryString.parse(window.location.search);
      if (Object.keys(queries).length !== 0) {
        const st = `?user=${queries["user"]}&start-date=${queries["start-date"]}&end-date=${queries["end-dat"]}`;
        history.push({ pathname: `/home`, search: st });
        ApiService.FilterData(queries["user"], token["mytoken"])
          .then((response) => setFilterData(response))
          .catch((error) => console.log(error));
      } else {
        history.push({ pathname: `/home` });
      }
    } else {
      history.push("/");
    }
  }, [history, token, uid]);

  const handleResult = () => {
    let inpt = inpValue;
    const myArr = inpt.split(",");
    let inp = myArr.map((i) => Number(i));
    inp.sort(function (a, b) {
      return b - a;
    });
    inp = inp.map((i) => String(i));
    inp = inp.join(",");
    if (myArr.includes(srcValue) === false) {
      setResult("False");
    } else {
      setResult("True");
    }
    ApiService.AddInput({ inp }, token["mytoken"])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const handleFilter = () => {
    let st = startDate;
    let ed = endDate;
    if (st === undefined && ed === undefined) {
      st = "no-date";
      ed = "no-date";
    } else if (ed === undefined && st !== undefined) {
      ed = st;
      st = st + ":00Z";
      ed = ed + ":00Z";
    } else if (ed !== undefined && st === undefined) {
      st = ed;
      st = st + ":00Z";
      ed = ed + ":00Z";
    } else {
      st = st + ":00Z";
      ed = ed + ":00Z";
    }

    st = st.replace(/:/g, "-");
    ed = ed.replace(/:/g, "-");

    ApiService.FilterData(uid, st, ed, token["mytoken"])
      .then((response) => setFilterData(response))
      .catch((error) => console.log(error));
    history.push({
      pathname: `/home`,
      search: `?user=${uid}&start-date=${st}&end-date=${ed}`,
    });
  };
  const handlelogOut = () => {
    ApiService.LogOut(token["mytoken"])
      .then((response) => setToken("mytoken", ""))
      .catch((error) => console.log(error));
    removeToken(["mytoken"]);
  };

  return (
    <div className="container m-3">
      <div className="row">
        <div className="col-md-12 ">
          <div className="card p-3" style={{ marginLeft: "30%" }}>
            <div className="card-header">
              <input
                type="button"
                className="btn btn-danger"
                value="Logout!"
                onClick={handlelogOut}
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card m-2">
                  <h4 className="card-title p-3">Search Input</h4>
                  <div className="card-body form-control">
                    <div className="inp-field">
                      <label className="form-label" for="inp">
                        Input
                      </label>
                      <input
                        type="text"
                        className="text-left form-control"
                        id="inp"
                        value={inpValue}
                        onChange={(e) => {
                          setInpValue(e.target.value);
                        }}
                      />
                    </div>
                    <div className="src-field">
                      <label className="form-label" for="src">
                        Search
                      </label>
                      <input
                        type="text"
                        className="text-left form-control"
                        id="src"
                        value={srcValue}
                        onChange={(e) => {
                          setSrcValue(e.target.value);
                        }}
                      />
                    </div>
                    <input
                      type="button"
                      className="btn btn-primary"
                      value="Khoj"
                      onClick={handleResult}
                    />
                    <label for="res" style={{ color: "white", margin: 5 }}>
                      Result:{" "}
                    </label>
                    {results === "True" ? (
                      <span id="res" style={{ color: "green" }}>
                        {results}
                      </span>
                    ) : (
                      <span id="res" style={{ color: "red" }}>
                        {results}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex justify-content-start">
                <div className="card m-2">
                  <div className="card-header">Filter</div>
                  <div className="card-body form-control">
                    <div>
                      <label className="form-label" for="user">
                        User Id:
                      </label>
                      <input
                        type="number"
                        id="user"
                        name="user"
                        className="form-control"
                        value={uid}
                        onChange={(e) => {
                          setUid(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="form-label" for="start">
                        Start Time:
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="start"
                        name="start"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <label className="form-label" for="end">
                        End TIme:
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="end"
                        name="end"
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                      />
                    </div>
                    <input
                      type="button"
                      className="btn btn-success"
                      value="Filter"
                      onClick={() => {
                        handleFilter();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card mt-2">
                  <div className="card-title text-center p-3">
                    Filtered Data
                  </div>
                  <div className="card-body">
                    <div className="card w-20">
                      <div className="card-body">
                        {filterData.length === 0 ? (
                          <h4
                            className="p-2 text-center"
                            style={{ color: "white" }}
                          >
                            No data found
                          </h4>
                        ) : (
                          filterData.map((it) => {
                            return (
                              <ul key={Math.random()}>
                                <li className="text-center">User: {it.user}</li>
                                <li className="text-center">Input: {it.inp}</li>
                                <li className="text-center">
                                  Created At: {it.created_at}
                                  <br />
                                  Date: {
                                    it.created_at.split("T")[0]
                                  } <br /> Time:{" "}
                                  {it.created_at.split("T")[1].split(":")[0]} :{" "}
                                  {it.created_at.split("T")[1].split(":")[1]}
                                </li>
                              </ul>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
