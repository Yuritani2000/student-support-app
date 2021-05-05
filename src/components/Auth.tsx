import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import Frame2 from './Frame2';
import firebase from '../firebase';
import { isConstructorDeclaration } from 'typescript';

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
            return <Frame2/>
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