import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router basename="/tech-news-app">
      <div className="App">
        <Dashboard />
      </div>
    </Router>
  );
}

export default App;