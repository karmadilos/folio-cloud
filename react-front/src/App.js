import 'bootstrap/dist/css/bootstrap.css'
import { Login } from './Page/Login';
import { Signup } from './Page/Signup'
import { Route,Switch } from 'react-router-dom';
import { Nav } from './component/Nav';
import { User } from './Page/User';

function App() {
  return (
    <div>        
      <Nav/>
      <Route>
        <Switch>
          <Route exact path="/"><User/></Route>
          <Route path="/login/"><Login/></Route>
          <Route path="/signup/"><Signup/></Route>
          <Route path="/user/:user_id"><User/></Route>
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
