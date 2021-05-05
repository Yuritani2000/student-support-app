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
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/frame1' component={Frame1}/>
        <Route path='/frame5' component={Frame5}/>
        <Auth>
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
