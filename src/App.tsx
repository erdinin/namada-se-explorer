import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Validators, Blocks, Proposals } from "./pages";
import { Main } from "./layouts";

function App() {

  return (
    <BrowserRouter>
      <Routes>
     
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/validators" element={<Validators />} />
            <Route path="/blocks" element={<Blocks />} />
            <Route path="/proposals" element={<Proposals />} />
          </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
