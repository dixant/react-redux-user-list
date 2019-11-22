import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';
import UserList from './components/UserList';
import FavouriteUserList from './components/FavouriteUserList';


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          React Redux User List Application
        </h1>
      </header>
      <Router >
        <Switch>
          <Route exact path="/" >
            <UserList />
          </Route>
          <Route path="/favourites" >
            <FavouriteUserList />
          </Route>
          <Route><UserList/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
