import React from 'react';
import Header from './components/header/Header';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing';

function App() {
  return (
    <BrowserRouter >
      <Header />
      <div className="page">
        <Route exact path="/" component={Landing} />
      </div >
    </BrowserRouter>
  );
}

export default App;
