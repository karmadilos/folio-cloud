import { Main } from './Page/Main';
import {Signup} from './Page/Signup'
import {Route,Switch} from 'react-router-dom';
import { Nav } from './component/Nav';

function App() {
  return (
    <div>        
      <Nav/>
      <Switch>
        <Route exact path="/"><Main/></Route>
        <Route path="/signup/"><Signup/></Route>
      </Switch>
    </div>
  );
}

export default App;
