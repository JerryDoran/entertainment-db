import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import "./globals.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>

      <BottomNav />
    </Router>
  );
}
