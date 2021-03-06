import 'bootstrap/dist/css/bootstrap.css'
import { Login } from './Page/Login';
import { Signup } from './Page/Signup'
import { Route,Switch } from 'react-router-dom';
import { Header } from './component/Header';
import { User } from './Page/User';
import { UserList } from './Page/UserList';

function App() {
  return (
    <div>        
      <Header/>
      <Route>
        <Switch>
          <Route exact path="/"><UserList/></Route>
          <Route path="/signup"><Signup/></Route>
          <Route path="/user/:id"><User/></Route>
          <Route
          render={({ location }) => (
            <div>
              <h2>Not Found 404</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
        </Switch>
      </Route>
    </div>
  );
}

export default App;
