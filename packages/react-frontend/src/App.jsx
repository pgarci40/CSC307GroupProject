import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import NavbarS from "./components/Navbar_search";
import Search from "./pages/Search";

function App() {
  return (
    <div>
      <NavbarS />
      <Search />

      {/* <Navbar />
      <Home /> */}
    </div>
  );
}

export default App;
