import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Frame1 from './Frame1';
import Frame2 from './Frame2';
import Frame5 from './Frame5';
import Frame7 from './Frame7';

const App: React.FC = () =>{
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/frame1' component={Frame1}/>
        <Route path='/frame2' component={Frame2}/>
        <Route path='/frame5' component={Frame5}/>
        <Route path='/frame7' component={Frame7}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
