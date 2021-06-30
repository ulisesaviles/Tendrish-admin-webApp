import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import * as Pages from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Tendrish/" component={Pages.Root} />
      </Switch>
    </Router>
  );
}

export default App;
