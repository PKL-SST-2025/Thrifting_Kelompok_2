import { Router, Route, A} from "@solidjs/router";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import AllProducts from "./pages/AllProducts";
import Settings from "./pages/Settings";
import AddStuff from "./pages/AddStuff";
import Wishlist from "./pages/Wishlist";

export default function App() {
  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/product/:id?" component={ProductView} />
        <Route path="/products" component={AllProducts} />
        <Route path="/settings" component={Settings} />
        <Route path="/add-stuff" component={AddStuff} />
        <Route path="/wishlist" component={Wishlist} />
      </Router>
    </>
  )
}
