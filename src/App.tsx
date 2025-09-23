import { Router, Route, A} from "@solidjs/router";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import AllProducts from "./pages/AllProducts";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/product/:id?" component={ProductView} />
        <Route path="/products" component={AllProducts} />
        <Route path="/profile" component={Profile} />
      </Router>
    </>
  )
}
