import React, { useState, useEffect } from 'react';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput } from './StyledComponents';
import firebase, { database } from '../firebase';
import { OneSubjectType } from '../DataTypes/SubjectTypes';

type Frame9Props = {
    closeFrame9: () => void;
}

const Frame9: React.FC<Frame9Props> = (props) => {
    const [ newSubjectName, setNewSubjectName ] = useState('');
    const [ isSubmittable, setIsSubmittable ] = useState(false);
    const [ isWarning, setIsWarning ] = useState(false);

    const { closeFrame9 } = props;

    const subjectRef = database.ref('subject');

    const onChangeSubjectNameInput = (value: string) => {
        setNewSubjectName(value);
    }

    const onSubmit = () => {
        if(!isSubmittable){
            setIsWarning(true);
            return;
        }
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;
        const currentTimeStamp = new Date().toString();
        const subjectListRef = subjectRef.child(userId);
        const newSubject: OneSubjectType = {
            name: newSubjectName,
            memo: '',
            create_at: currentTimeStamp,
            update_at: currentTimeStamp
        }
        subjectListRef.push(newSubject);
        setIsWarning(false);
        setNewSubjectName('');
        setIsSubmittable(false);
        closeFrame9();
    }

    const CheckIsSubmittable = () => {
        if(newSubjectName === ''){
            setIsSubmittable(false);
        } else{
            setIsSubmittable(true);
        }
    }

    useEffect(()=>{
        CheckIsSubmittable();
    }, [newSubjectName]);

    return (
        <StyledDiv  margin='10% auto 0 auto'
                    width='min( calc(683px + (100vw - 683px)*0.1 ), 100vw )'
                    height='10cm'
                    backgroundColor='#fefefe'
                    enableShadow={true}
                    borderRadius={4}>
            <FlexBox    flexDirection='column'
                        alignItems='center'
                        justifyContent='space-around'>
                <StyledDiv flexGrow={1} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                    <StyledButton  onClick={()=> {setIsWarning(false);closeFrame9()}} width='3.5em'　height='2em' fontSize='1.5em' fontWeight='normal'>
                        戻る
                    </StyledButton>
                </StyledDiv>
                <StyledDiv flexGrow={2}>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            新しい科目を登録
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={2} width='60%'>
                    <StyledInput    value={newSubjectName}
                                    onChange={(e)=>{onChangeSubjectNameInput(e.target.value)}}
                                    width='100%'
                                    fontSize='1.5em'
                                    height='2.0em'
                                    placeholder='科目を入力してください。'
                                    borderColor={isWarning ? '#ff0000' : ''}/>
                </StyledDiv>
                <StyledDiv flexGrow={2} width='50%'>
                    <StyledButton onClick={()=>{ onSubmit() }} width='100%' height='2.0em' backgroundColor={isSubmittable ? '#87cefa' : 'd2d2d2'} fontColor={isSubmittable ? '#000000' : '#fefefe'} fontSize='1.5em' fontWeight='bold' >
                        登録
                    </StyledButton>
                </StyledDiv>
            </FlexBox>
        </StyledDiv>
    );
}

export default Frame9;