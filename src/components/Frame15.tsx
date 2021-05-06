import React, { useState, useEffect } from 'react';
import { isConstructorDeclaration } from 'typescript';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, StyledSelect } from './StyledComponents';
import firebase, { database } from '../firebase';
import { OneTaskType } from '../Datatype';

type Frame15Props = {
    closeFrame15: () => void;
}


const Frame15: React.FC<Frame15Props> = (props) => {
    const [ subjectSelectDisabled, setSubjectSelectDisabled ] = useState(true);
    const [ category, setCategory ] = useState('default');
    const [ subject, setSubject ] = useState('default');
    const [ taskName, setTaskName ] = useState('');
    const [ deadline, setDeadline ] = useState('');
    const [ isSubmittable, setIsSubmittable ] = useState(false);
    const [ isWarning, setIsWarning ] = useState(false);

    const { closeFrame15 } = props;

    const mockSubjects = ['現代文', '古文', '漢文', '物理', '化学', '生物', '数学IA', '数学IIB', '数学III', '地理A', '地理B', '世界史A', '世界史B', '日本史A', '日本史B', '現代社会', '倫理', '家庭', '体育', '保健', '情報科学', 'アルゴリズムとデータ構造', 'プロジェクト学習'];

    const onChangeCategory = (value: string) => {
        if(value === 'homework'){
            setSubjectSelectDisabled(false);
        }else{
            setSubjectSelectDisabled(true);
        }
        console.log('category selected: ' + value);
        setCategory(value);
    }

    const onChangeSubject = (value: string) => {
        setSubject(value);
    }

    const onChangeTaskName = (value: string) => {
        setTaskName(value);
    }

    const onChangeDeadline = (value: string) => {
        setDeadline(value);
    }

    const checkSubmittable = () => {
        console.log('check if submittable')
        if(category === 'default' || taskName === '' || deadline === ''){
            console.log('some forms are empty');
            setIsSubmittable(false);
        }else if(category === 'homework' &&　subject === 'default') {
            console.log('you must select any subject when homework is selected')
            setIsSubmittable(false);
        }else {
            console.log('now you can submit your task!')
            setIsSubmittable(true);
        }
    }
    
    const onSubmit = () => {
        if(!isSubmittable){
            setIsWarning(true);
        }else{
            pushTask();
            closeFrame15();
            setCategory('default');
            setSubject('default');
            setTaskName('');
            setDeadline('');
            setIsWarning(false);
        }
    }

    const pushTask = () => {
        const now = new Date();
        const currentTimeStamp = now.getTime();
        const user = firebase.auth().currentUser;
        if(!user){
            console.log('Task push failed: could not get user information.');
            return;
        }
        const userId = user.uid;
        if(!userId){
            console.log('Task push failed: could not get user ID.');
            return;
        }
        console.log('current user ID: ' + user.uid);
        const taskRef = database.ref('yuritani_demo/' + user.uid + '/task');
        const newTask: OneTaskType = {
            category: category,
            subject: subject,
            name: taskName,
            deadline: deadline,
            isDone: false,
            createdAt: currentTimeStamp,
            updatedAt: currentTimeStamp
        };
        taskRef.push(newTask);
    }
    
    useEffect(checkSubmittable, [category, subject, taskName, deadline]);

    return (
        <StyledDiv  margin='10% auto 0 auto'
                    width='min( calc(683px + (100vw - 683px)*0.1 ), 100vw )'
                    height='13cm'
                    backgroundColor='#fefefe'
                    enableShadow={true}
                    borderRadius={4}>
            <FlexBox    flexDirection='column'
                        alignItems='center'
                        justifyContent='space-around'>
                <StyledDiv flexGrow={0.5} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                    <StyledButton onClick={()=>{setIsWarning(false);closeFrame15()}} width='3.5em'　height='2em' fontSize='1.5em' fontWeight='normal'>
                        戻る
                    </StyledButton>
                </StyledDiv>
                <StyledDiv flexGrow={1}>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            課題追加
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={5} width='60%'>
                    <FlexBox flexDirection='column'>
                        <FlexBox alignItems='center'>
                            <StyledText width='8em' size='1.5em'>カテゴリー</StyledText>
                            <StyledSelect   value={category}
                                            onChange={(e)=> onChangeCategory(e.target.value)}
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'
                                            borderColor={(isWarning && (category==='default')) ? '#ff0000' : ''}>
                                <option value='default'>カテゴリーを選択</option>
                                <option value='homework'>授業課題</option>
                                <option value='todo'>ToDo</option>
                            </StyledSelect>
                        </FlexBox>
                        <FlexBox alignItems='center'>
                            <StyledText width='8em' size='1.5em'>科目名</StyledText>
                            <StyledSelect   value={subject}
                                            onChange={(e)=> onChangeSubject(e.target.value)}
                                            disabled={subjectSelectDisabled}
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'
                                            borderColor={(isWarning && subject==='default') ? '#ff0000' : ''}>
                                <option value='default'>科目を選択</option>
                                {
                                    mockSubjects.map((item) => {
                                        return <option value={item}>{item}</option>
                                    })
                                }
                            </StyledSelect>
                        </FlexBox>
                        <FlexBox alignItems='center'>
                            <StyledText width='8em' size='1.5em'>内容</StyledText>
                            <StyledInput    value={taskName}
                                            onChange={(e) => {onChangeTaskName(e.target.value)}}
                                            type='text'
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'
                                            placeholder='内容を入力'
                                            borderColor={(isWarning && (taskName==='')) ? '#ff0000' : ''}/>
                        </FlexBox>
                        <FlexBox alignItems='center'>
                            <StyledText width='8em' size='1.5em'>期限</StyledText>
                            <StyledInput    value={deadline}
                                            onChange={(e) => {onChangeDeadline(e.target.value)}}
                                            type='date'
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'
                                            placeholder='期限'
                                            borderColor={(isWarning && (deadline==='')) ? '#ff0000' : ''}/>
                        </FlexBox>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={2} width='50%' margin ='20px 0 0 0 '>
                    <StyledButton onClick={()=>{onSubmit()}} width='100%' height='2.0em' backgroundColor={isSubmittable ? '#87cefa' : '' } fontColor={isSubmittable ? '#000000' : '#fefefe'} fontSize='1.5em' fontWeight='bold'  >
                        追加
                    </StyledButton>
                </StyledDiv>
            </FlexBox>
        </StyledDiv>
    );
}

export default Frame15;