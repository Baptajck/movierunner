import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';

/**
 * Import local de components
 */
import Sidebar from '../Sidebar';
import Home from '../Home';
import Search from '../Search';
import Developer from '../Developer';

const App = () => {
  return (
    <div>
      <Sidebar />
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/developer">
          <Developer />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
