import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Auth from "./Auth";
import { render } from "react-dom";
import { Route, BrowserRouter, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/logs" element={<Hero /> } />
      </Routes>
    </BrowserRouter>
  );
}

const rootDiv = document.getElementById("root");
render(<App />, rootDiv);