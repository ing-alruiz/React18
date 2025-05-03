import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CharacterDetails from "../Components/Character/CharacterDetails/CharacterDetails";
import Home from "../Pages/Home/Home";

function AppRouter() {
  return (
    <>
      <div>
        <Link to="/">Main page</Link> | 
        <Link to="/page1">Page 1</Link>|{" "}
        <Link to="/page2">Page 2</Link>
        <Link to="/character/3">Character 3</Link>
      </div>

      <Routes>
        
        <Route path="/page2" element={<h1>I'm Page 2</h1>} />
        <Route path="/page1" element={<h1>I'm Page 1</h1>} />
        <Route path="/" element={<Home/>} />
        <Route
            path="/character/:id"
            element={<CharacterDetails />}  
        />
      </Routes>
    </>
  );
}

export default AppRouter;