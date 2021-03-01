import 'bootstrap/dist/css/bootstrap.css'
import { Login } from './Page/Login';
import { Signup } from './Page/Signup'
import { Route,Switch } from 'react-router-dom';
import { Nav } from './component/Nav';
import { Main } from './Page/Main';
import { User } from './Page/User';

function App() {
  return (
    <div>        
      <Nav/>
      <Route>
      <Switch>
        <Route exact path="/login"><Login/></Route>
        <Route path="/signup/"><Signup/></Route>
        <Route path="/user/"><User/></Route>
      </Switch>
      </Route>
    </div>
  );
}

export default App;
