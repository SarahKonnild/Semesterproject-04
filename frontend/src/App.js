import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Navbar from '../src/components/Navigation/navbar';
import Footer from '../src/components/Footer/footer';

import Production from './pages/Production/index.js';
import Simulation from './pages/Simulation/index.js';
import Batches from './pages/Batches_Overview/index.js';
import Login from './pages/Login/index.js';
import Details from './pages/Batches_Detailed/index';

function App() {
  return (
    <BrowserRouter style={{margin:0}}>
      <Navbar/>
        <Switch>
          <Route path="/production" component={Production}/>
          <Route path="/simulation" component={Simulation}/>
          <Route path="/batches" component={Batches}/>
          <Route path="/details" component={Details}/>
          <Route path="/login" component={Login}/>
          <Redirect from="/" to="/production"/>
        </Switch>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
