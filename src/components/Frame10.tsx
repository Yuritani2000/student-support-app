import React from 'react';
import firebase from '../firebase';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, HoverElement2, StyledSelect } from './StyledComponents';
import CheckButton from './CheckButton';
import { Redirect } from 'react-router-dom';

const mockMemo = ['アルゴの課題について', '買い物リスト', 'チケットの予約', '欲しいものリスト', 'ポエム', 'ポエム2'];

const Frame10: React.FC = () => {

    const render = () => {
        if(firebase.auth().currentUser){
            console.log('signed in as: ' + firebase.auth().currentUser?.email);
            return (
                <StyledDiv  margin='5% auto 0 auto'
                width='min( calc(683px + (100vw - 683px)*0.4 ), 100vw )'
                height='auto'
                backgroundColor='transparent'
                enableShadow={false}
                borderRadius={4}>
                    <FlexBox    flexDirection='column'
                        alignItems='center'
                        justifyContent='space-around'>
                        <StyledDiv flexGrow={2} margin='30px 0 0 0 '>
                            <FlexBox alignItems='center'>
                                <StyledText size='1.8em' fontWeight='normal'>
                                    課題一覧
                                </StyledText>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={1} margin='0 30px 0 0 ' alignSelf='flex-end' >
                            <FlexBox>
                                <StyledDiv margin='0 30px 0 0 '>
                                    <StyledSelect   onChange={(e)=>{}}
                                                        width='200px'
                                                        fontSize='1.5em'
                                                        height='2.0em'>
                                        <option value='all'>全てのToDo</option>
                                        <option value='homework'>授業課題</option>
                                        <option value='todo'>ToDo</option>
                                    </StyledSelect>
                                </StyledDiv>
                                <StyledButton height='1.5em' width='1.5em' fontSize='3em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='50%'>
                                    +
                                </StyledButton>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={1} margin='0 0 0 60%' alignSelf='flex-start'>
                            <StyledText size='1.7em'>
                                期限
                            </StyledText>
                        </StyledDiv>
                        <StyledDiv flexGrow={20} width='95%' margin='0 0 30px 0' >
                            <FlexBox flexDirection='column' >
                                {
                                    mockMemo.map((item) => {
                                        return  <StyledDiv width='100%' enableShadow={true} margin='20px 20px 0 0' isClickable={true} backgroundColor='#fefefe' borderRadius={4}>
                                                    <FlexBox justifyContent='space-around' flexDirection='row' alignItems='center' height='4.5em' >
                                                        <CheckButton isChecked={true} width='4.5rem' height='4.5rem'>
                                                        </CheckButton>
                                                        <StyledText size='1.7em' isClickable={true} width='45%' >
                                                            {item}
                                                        </StyledText>
                                                        <StyledText size='1.7em' isClickable={true} width='40%'>
                                                            YYYY / MM / DD
                                                        </StyledText>
                                                        <StyledButton width='4.5em' height='4.5rem' fontSize='1.2em' fontColor='#fefefe' fontWeight='bold' backgroundColor='#ff4500' borderRadius='4px'>
                                                            削除
                                                        </StyledButton>
                                                    </FlexBox>
                                                </StyledDiv>
                                    })
                                }
                            </FlexBox>
                        </StyledDiv>
                    </FlexBox>
                </StyledDiv>
            )
        }else{
            return <Redirect to='/frame1'/>
        }
    }

    return (
        <>
            {render()}
        </>
    );
} 

export default Frame10;