// Navigation-related imports
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// Pages
import * as Pages from "./pages";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/Tendrish-admin-webApp/" component={Pages.Root} />
        <Route path="/" component={Pages.Root} />
      </Switch>
    </Router>
  );
};

export default App;
