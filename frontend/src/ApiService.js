export default class ApiService {
  static FilterData(user_id, st, ed, token) {
    console.log(user_id, st, ed);
    return fetch(`http://127.0.0.1:8000/input/${user_id}/${st}/${ed}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.json());
  }

  static AddUser(body) {
    //https://django-rest-api-01.herokuapp.com/users/
    console.log(body);
    return fetch(`http://127.0.0.1:8000/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      //console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        return { error: "error" };
      }
    });
  }
  static AddInput(body, token) {
    //console.log(article_id, body)
    return fetch(`http://127.0.0.1:8000/input/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
  static LogIn(body) {
    //https://django-rest-api-01.herokuapp.com/login/
    return fetch("http://127.0.0.1:8000/login/", {
      method: "POST",
      //method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }

  static LogOut(token) {
    return fetch("http://127.0.0.1:8000/logout/", {
      //'method': 'POST',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }).then((response) => response.json());
  }
}
