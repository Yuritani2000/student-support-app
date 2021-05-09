import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { Parent, Background, StyledDiv, StyledText, FlexBox, StyledInput, StyledButton, ModalBase, RelativeBox, AbsoluteBox } from './StyledComponents';
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom';

const Frame1:React.FC = () => {
    const [ emailAddress, setEmailAddress ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ warning, setWarning ] = useState(false);

    const history = useHistory(); 
    
    let _isMounted = false;

    useEffect(()=> {
        _isMounted = true;

        return (()=> {
            _isMounted = false;
        })
    });

    const onChangeEmailAddress = (value: string) => {
        setEmailAddress(value);
    }

    const onChangePassword = (value: string) => {
        setPassword(value);
    }

    const onSubmit = () => {
        if(emailAddress === '' || password === ''){
            handleAuthenticationFailed();
            return;
        }

        firebase.auth().signInWithEmailAndPassword(emailAddress, password)
            .then(res => {
                console.log('successfully signed in');
                setWarning(false);
                history.push('/frame2');
            
            })
            .catch(error => {
                console.log('sign in failed');
                handleAuthenticationFailed();
            })
    }

    const handleAuthenticationFailed = () => {
        setWarning(true);
        setPassword('');
    }

    const OnClockToSignUP = () => {
        history.push('/frame5');
    }

    return(
        <RelativeBox>
            <Parent width='500px' height='100vh' margin='auto'>
                <AbsoluteBox top='40%' left='50%' translateX={-50} translateY={-50}>
                    <ModalBase>
                    <FlexBox    alignItems='center'
                                justifyContent='space-around'
                                flexDirection='column'>
                        <StyledDiv  flexGrow={2}>
                            <FlexBox alignItems='center'>
                                <StyledText size='2em' fontWeight='bold'>
                                    Sign in
                                </StyledText>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={0.3}>
                            <StyledText isHidden={!warning} fontColor='#ff0000' fontWeight='normal' size='0.8em'>
                                *メールアドレスまたはパスワードに誤りがあります
                            </StyledText>
                        </StyledDiv>
                        <StyledDiv  flexGrow={1} width='80%'>
                            <FlexBox alignItems='center'>
                                <FlexBox flexDirection='column'>
                                    <StyledText>
                                        gmailアドレス
                                    </StyledText>
                                    <StyledInput type='text' width='100%' height='2.5rem' fontSize='1.2em' value={emailAddress} onChange={(e) => onChangeEmailAddress(e.target.value)}/>
                                </FlexBox>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv  flexGrow={1} width='80%'>
                            <FlexBox alignItems='center'>
                                <FlexBox flexDirection='column'>
                                    <StyledText>
                                        パスワード
                                    </StyledText>
                                    <StyledInput type='password' width='100%' height='2.5rem' fontSize='1.2em' value={password} onChange={(e) => onChangePassword(e.target.value)}/>
                                </FlexBox>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv  flexGrow={2} width='80%'>
                            <FlexBox alignItems='center'>
                                <StyledButton width='100%' height='2.5em' fontWeight='bold' fontSize='1.2em' backgroundColor='#87cefa' onClick={()=> onSubmit()}>サインイン</StyledButton>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={0.5}>
                            <StyledText onClick={()=> { OnClockToSignUP() }} isClickable={true} fontColor='#1e90ff' size='0.9em' fontWeight='normal'>
                                Sign upはこちら
                            </StyledText>
                        </StyledDiv>
                    </FlexBox>
                    </ModalBase>
                </AbsoluteBox>
            </Parent>
        </RelativeBox>
    );
}

export default Frame1;