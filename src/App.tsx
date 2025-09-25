import { Router, Route, A} from "@solidjs/router";
import { onMount } from "solid-js";
import { initializeAppUser } from "./lib/api";
import Home from "./pages/Home";
import ProductView from "./pages/ProductView";
import AllProducts from "./pages/AllProducts";
import Settings from "./pages/Settings";
import AddStuff from "./pages/AddStuff";
import Wishlist from "./pages/Wishlist";
import MyProfile from "./pages/MyProfile";

export default function App() {
  onMount(() => {
    console.log('🚀 App mounting - initializing user system...');
    initializeAppUser();
  });

  return (
    <>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/product/:id?" component={ProductView} />
        <Route path="/products" component={AllProducts} />
        <Route path="/products/category/:slug" component={AllProducts} />
        <Route path="/settings" component={Settings} />
        <Route path="/add-stuff" component={AddStuff} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/profile" component={MyProfile} />
        <Route path="/my-profile" component={MyProfile} />
      </Router>
    </>
  )
}
