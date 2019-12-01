import React from 'react';

import {createBrowserHistory} from 'history';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import Tickets from './components/Tickets';
import {
  Switch,
  Route
} from "react-router-dom";
const history = createBrowserHistory();
const location = history.location;
function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <Header />
      </header>
      <Switch>
        <Route path="/tickets">
          <Tickets history={history} location={location}/>
        </Route>
        <Route path="/" exact>
          <Main history={history} location={location}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
