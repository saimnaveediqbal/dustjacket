import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Upload from "./pages/Upload";
import Loading from "./pages/Loading";
import Results from "./pages/Results";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Upload/>} />
          <Route path="/loading" element={<Loading/>} />
          <Route path="/result" element={<Results/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
