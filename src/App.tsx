import { Router, Route, A} from "@solidjs/router";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
      </Router>
    </>
  )
}
