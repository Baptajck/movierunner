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
import Login from '../Login';
import Create from '../Create'
// import MoviesPoster from '../MoviesPoster';
// import MoviesUpcoming from '../MoviesUpcoming';
// import ShowsPopular from '../ShowsPopular';

const App = () => {
  return (
    <div>
      <Sidebar />
      <Switch>
        {/*
          <Route path="/movies/poster">
            <MoviesPoster />
          </Route>
          <Route path="/movies/upcoming">
            <MoviesUpcoming />
          </Route>
          <Route path="/shows/popular">
            <ShowsPopular />
          </Route>
        */}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
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
