import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Landing from './pages/landing/Landing';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <BrowserRouter >
      <Header />
      <div className="page">
        <Route exact path="/" component={Landing} />
        <Route exact path="/profile" component={Profile} />
      </div >
    </BrowserRouter>
  );
}

export default App;
