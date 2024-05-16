import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Cards from './components/Cards';
import { BrowserRouter as Router, Route, Switch, Redirect,  } from 'react-router-dom';


function App() {
  
  return (
    <Router>
      <Switch>
        <Route path='/:cod'>
          <Header />
          <Cards />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
