import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Navbar from '../src/components/Navigation/navbar';
import Footer from '../src/components/Footer/footer';

import Production from '../src/containers/Production/index.js'

function App() {
  return (
    <BrowserRouter style={{margin:0}}>
      <Navbar/>
      {/* <Switch>
        <Route path="/production" component={Production}/>
        <Redirect from="/" to="/production"/>
      </Switch> */}
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
