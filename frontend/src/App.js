import './App.css';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from '../src/components/Navigation/navbar';
import Footer from '../src/components/Footer/footer';
=======
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
>>>>>>> Login_Pages

import Production from './pages/Production/index.js';
import Simulation from './pages/Simulation/index.js';
import Batches from './pages/Batches_Overview/overview.js';
import Login from './pages/Login/login.js';
import Details from './pages/Batches_Detailed/detailed.js';
import PrivateRoutes from './components/Auth/PrivateRoutes';

function App() {
<<<<<<< HEAD
    return (
        <BrowserRouter style={{ margin: 0 }}>
            <Navbar />
            <Switch>
                <Route path='/production' component={Production} />
                <Route path='/simulation' component={Simulation} />
                <Route path='/batches' component={Batches} />
                <Route path='/login' component={Login} />
                <Redirect from='/' to='/production' />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
=======
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
>>>>>>> Login_Pages
}

export default App;
