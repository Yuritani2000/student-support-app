import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../firebase';
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


const Auth:React.FC = () => {

    type SignInStatusType = { isSignInChecked: boolean, isSignedIn: boolean }

    const [ signInStatus, setSignInStatus ] = useState({ isSignInChecked: false, isSignedIn: false } as SignInStatusType);

    let _isMounted = false;

    const ref = useRef<HTMLDivElement>();

    useEffect(() => {

        _isMounted = true;

        firebase.auth().onAuthStateChanged( user => {
            if(user) {
                if(_isMounted){
                    console.log('auth already confirmed');
                    setSignInStatus({ isSignInChecked: true, isSignedIn: true });
                }
            }else{
                if(_isMounted) {
                    console.log('auth denied');
                    setSignInStatus({ isSignInChecked: true, isSignedIn: false });
                }
            }
        })

        return (()=>{
            _isMounted = false;
        })

    }, []);

    const render = () => {

        if(!signInStatus.isSignInChecked){
            return <div>認証中...</div>
        }

        if(signInStatus.isSignedIn){
            console.log('redirect to frame2');
            return (
                <Switch>
                    <Route path='/frame2' component={Frame2}/>
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
              </Switch>
            )
        }else{
            console.log('require sign in or up');
            return <Redirect to='/frame1'/>
        }

    }

    return (
        <>
            {render()}
        </>
    )

}

export default Auth;