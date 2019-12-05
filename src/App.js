import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserList from './components/UserList';
import FavouriteUserList from './components/FavouriteUserList';
import { NavLink } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <h2 className="navbar-brand">React Redux User List Application</h2>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item active">
              <NavLink exact className="nav" activeClassName="active-nav" to="/">UserList</NavLink>
              </li>
              <li className="nav-item">
              <NavLink exact className="nav" activeClassName="active-nav" to="/favourites">Favourite UserList</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" >
          <UserList />
        </Route>
        <Route path="/favourites" >
          <FavouriteUserList />
        </Route>
        <Route><UserList /></Route>
      </Switch>
    </div>
  );
}

export default App;
