import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';
import UserList from './components/UserList';
import FavouriteUserList from './components/FavouriteUserList';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          React Redux User List Application
        </h1>
      </header>
      <Router>
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route path="/favourites" component={FavouriteUserList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
