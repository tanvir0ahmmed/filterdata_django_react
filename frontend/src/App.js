import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

//root component which contain all component and controll route from here
function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Router>
          {/* <ScrollToTop/> */}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route path="/register" component={Registration} />
          </Switch>
        </Router>
      </CookiesProvider>
    </div>
  );
}

export default App;
