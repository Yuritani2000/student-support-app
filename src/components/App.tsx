import React, { useEffect } from 'react';
import firebase from '../firebase'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Frame1 from './Frame1';
import Frame2 from './Frame2';
import Frame5 from './Frame5';
import Frame7 from './Frame7';
import Frame8 from './Frame8';
import Frame9 from './Frame9';
import Frame4 from './Frame4';
import Frame13 from './Frame13';
import Frame16 from './Frame16';
import Frame17 from './Frame17';
import Frame11 from './Frame11';
import Frame15 from './Frame15';
import Frame10 from './Frame10';
import Frame14 from './Frame14';
import Frame3 from './Frame3';
import Auth from './Auth';

const App: React.FC = () =>{

  useEffect(()=>{
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/frame1' component={Frame1}/>
        <Route path='/frame2' component={Frame2}/>
        <Route path='/frame5' component={Frame5}/>
        <Route path='/frame7' component={Frame7}/>
        <Route path='/frame8' component={Frame8}/>
        <Route path='/frame9' component={Frame9}/>
        <Route path='/frame4' component={Frame4}/>
        <Route path='/frame13' component={Frame13}/>
        <Route path='/frame16' component={Frame16}/>
        <Route path='/frame17' component={Frame17}/>
        <Route path='/frame11' component={Frame11}/>
        <Route path='/frame15' component={Frame15}/>
        <Route path='/frame10' component={Frame10}/>
        <Route path='/frame14' component={Frame14}/>
        <Route path='/frame3' component={Frame3}/>
        <Route path='/' component={Auth}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
