import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Category from './components/Category';
import Spendetails from './components/Spendetails';
import ReportGenerator from './components/ReportGenerator';
import ReportGeneratorForCategory from './components/ReportGeneratorForCategory';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div>
      <NavBar />
      <div className="main-content">
      <Routes>
          <Route path="/" element={<Category/>} />
          <Route path="/category" element={<Category />} />
          <Route path="/spendetails" element={<Spendetails />} />
          <Route path="/spendwisereports" element={<ReportGenerator />} />
          <Route path="/categorywisereports" element={<ReportGeneratorForCategory />} />
        </Routes>
      </div>
        
      </div>
    </Router>
  );
}

export default App;
