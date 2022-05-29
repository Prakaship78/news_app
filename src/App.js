import "./App.css";

import React from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;

  const pageSize = 12;
  return (
    <div>
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/">
            <News
              pageSize={pageSize}
              apiKey={apiKey}
              country="in"
              key="home"
              category="general"
            />{" "}
          </Route>

          <Route exact path="/entertainment">
            <News
              pageSize={pageSize}
              apiKey={apiKey}
              country="in"
              key="entertainment"
              category="entertainment"
            />{" "}
          </Route>
          <Route exact path="/general">
            <News
              pageSize={pageSize}
              apiKey={apiKey}
              country="in"
              key="general"
              category="general"
            />{" "}
          </Route>
          <Route exact path="/health">
            <News
              pageSize={pageSize}
              apiKey={apiKey}
              country="in"
              key="health"
              category="health"
            />{" "}
          </Route>
          <Route exact path="/science">
            <News
              pageSize={pageSize}
              apiKey={apiKey}
              country="in"
              key="science"
              category="science"
            />{" "}
          </Route>
          <Route exact path="/sports">
            <News
              pageSize={pageSize}
              apiKey={apiKey}
              country="in"
              key="sports"
              category="sports"
            />{" "}
          </Route>
          <Route exact path="/technology">
            <News
              pageSize={pageSize}
              apiKey={apiKey}
              country="in"
              key="technology"
              category="technology"
            />{" "}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
