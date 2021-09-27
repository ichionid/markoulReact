import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList'
import TodoItem from './components/TodoItem'

import {
  BrowserRouter as Router,
  Link,
  Switch,
  useLocation,
  Route
} from "react-router-dom";

function App() {
  const items = [
    {title:'station one',body:'000'},
    {title:'station two',body:'001'}
  ];
  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/items">MarkoulI tems</Link>
          </li>
        </ul>
        <hr />
        <Switch>
            <Route exact path="/">
              "Markoul!"
            </Route>
            <Route path="/items">
              <TodoList items={items}></TodoList>
            </Route>
            <Route path='/item/:id' render={(props) => {
                  return ( <TodoItem {...props } /> )
            }} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
