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
      <Switch>
        <Route exact path="/"><Main/></Route>
        <Route path="/login/"><Login/></Route>
        <Route path="/signup/"><Signup/></Route>
        <Route path="/user/:name"><User/></Route>
      </Switch>
    </div>
  );
}

export default App;
