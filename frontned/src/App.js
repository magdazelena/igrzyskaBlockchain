import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Tickets from './components/Tickets';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Header />
      </header>
      <Switch>
        <Route path="/tickets">
          <Tickets />
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
