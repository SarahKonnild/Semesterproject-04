import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Production from './pages/Production/index.js';
import Simulation from './pages/Simulation/index.js';
import Batches from './pages/Batches_Overview/overview.js';
import Login from './pages/Login/login.js';
import Details from './pages/Batches_Detailed/detailed.js';
import PrivateRoutes from './components/Auth/PrivateRoutes';

function App() {
  return (
    <BrowserRouter style={{ margin: 0 }}>
      <Switch>
        <PrivateRoutes exact path='/production' component={Production} />
        <PrivateRoutes exact path='/simulation' component={Simulation} />
        <PrivateRoutes exact path='/batches' component={Batches} />
        <PrivateRoutes path='/details' component={Details} />
        <Route exact path='/login' component={Login} />
        <Redirect exact path='/' to='/login' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
