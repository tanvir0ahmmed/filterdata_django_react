export default class ApiService {
  static FilterData(user_id, st, ed, token) {
    console.log(user_id, st, ed);
    return fetch(
      `https://filter-data.herokuapp.com/input/${user_id}/${st}/${ed}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    ).then((response) => response.json());
  }

  static AddUser(body) {
    console.log(body);
    return fetch(`https://filter-data.herokuapp.com/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return { error: "error" };
      }
    });
  }
  static AddInput(body, token) {
    return fetch(`https://filter-data.herokuapp.com/input/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
  static LogIn(body) {
    return fetch("https://filter-data.herokuapp.com/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static LogOut(token) {
    return fetch("https://filter-data.herokuapp.com/logout/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.json());
  }
}
