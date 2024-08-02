import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import './App.css'
import Category from './components/Category';
import Spendetails from './components/Spendetails';
import ReportGenerator from './components/ReportGenerator';
import ReportGeneratorForCategory from './components/ReportGeneratorForCategory';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/spendetails">Spendetails</Link>
            </li>
            <li>
              <Link to="/spendwisereports">Spend Report</Link>
            </li>
            <li>
              <Link to="/categorywisereports">Category Report</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Category/>} />
          <Route path="/category" element={<Category />} />
          <Route path="/spendetails" element={<Spendetails />} />
          <Route path="/spendwisereports" element={<ReportGenerator />} />
          <Route path="/categorywisereports" element={<ReportGeneratorForCategory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
