import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { Parent, Background, StyledDiv, StyledText, FlexBox, StyledInput, StyledButton, ModalBase, RelativeBox, AbsoluteBox } from './StyledComponents';
import { useHistory } from "react-router-dom";
import { create } from 'node:domain';

const Frame1:React.FC = () => {
    const [ emailAddress, setEmailAddress ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repeatedPassword, setRepeatedPassword] = useState("");
    const [ warning, setWarning ] = useState(false);

    const history = useHistory();  

    const onChangeEmailAddress = (value: string) => {
        setEmailAddress(value);
    }

    const onChangePassword = (value: string) => {
        setPassword(value);
    }

    const onChangeRepeatedPassword = (value: string) => {
        setRepeatedPassword(value);
    }

    const OnClockToSignIN = () => {
        history.push('/frame1');
    }

    const onSubmit = () => {
        if(emailAddress === '' || password === '' || repeatedPassword === ''){
            createUserFailed();
            return;
        }

        if(password !== repeatedPassword) {
            createUserFailed();
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
            .then(res => {
                setWarning(false);
                // ユーザー作成後の処理を記述
                history.push('/frame2');
            })
            .catch(error => {
                console.log('sign up failed');
                alert(error);
                createUserFailed();
            })
    }

    const createUserFailed = () => {
        setWarning(true);
        setPassword('');
        setRepeatedPassword('');
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
                                    Sign up
                                </StyledText>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={0.3}>
                            <StyledText isHidden={!warning} fontColor='#ff0000' fontWeight='normal' size='0.8em'>
                                *入力情報が既に使用されているか、誤りがあります。
                            </StyledText>
                        </StyledDiv>
                        <StyledDiv  flexGrow={1} width='80%'>
                            <FlexBox alignItems='center'>
                                <FlexBox flexDirection='column'>
                                    <StyledText>
                                        gmailアドレス
                                    </StyledText>
                                    <StyledInput type='text' width='100%' height='2.5rem' fontSize='1.2em' value={emailAddress} onChange={(e)=> onChangeEmailAddress(e.target.value)}/>
                                </FlexBox>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv width='80%' flexGrow={0.4} >
                            <FlexBox flexDirection='column' alignItems='center' justifyContent='space-around'>
                                <StyledDiv  flexGrow={1} width='100%'>
                                    <FlexBox alignItems='center'>
                                        <FlexBox flexDirection='column'>
                                            <StyledText>
                                                パスワード
                                            </StyledText>
                                            <StyledInput type='password' width='100%' height='2.5rem' fontSize='1.2em' value={password} onChange={(e) => onChangePassword(e.target.value)}/>
                                        </FlexBox>
                                    </FlexBox>
                                </StyledDiv>
                                <StyledDiv  flexGrow={1} width='100%'>
                                    <FlexBox alignItems='center'>
                                        <FlexBox flexDirection='column'>
                                            <StyledText>
                                                パスワード再確認
                                            </StyledText>
                                            <StyledInput type='password' width='100%' height='2.5rem' fontSize='1.2em' value={repeatedPassword} onChange={(e)=> onChangeRepeatedPassword(e.target.value)}/>
                                        </FlexBox>
                                    </FlexBox>
                                </StyledDiv>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv  flexGrow={2} width='80%'>
                            <FlexBox alignItems='center'>
                                <StyledButton width='100%' height='2.5em' fontWeight='bold' fontSize='1.2em' backgroundColor='#87cefa' onClick={()=>{ onSubmit() }}>登録</StyledButton>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={0.5}>
                            <StyledText onClick={()=> { OnClockToSignIN() }} isClickable={true} fontColor='#1e90ff' size='0.9em' fontWeight='normal'>
                                Sign inはこちら
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