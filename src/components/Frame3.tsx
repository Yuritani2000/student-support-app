import React, {useState} from 'react';
import firebase from '../firebase';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, AbsoluteBox, FixedBox, StyledTextArea } from './StyledComponents';
import Calendar from 'react-calendar';
import { Redirect } from 'react-router-dom';
import HamburgerMenuButton from './HamburgerMenuButton';
import Frame7 from './Frame7';

const mockMemo = ['アルゴの課題について', '買い物リスト', 'チケットの予約', '欲しいものリスト', 'ポエム', 'ポエム2'];

const Frame3: React.FC = () => {

    const onClickDay = (date: Date) => {
        alert('クリックされた日: ' + date.getFullYear() + ' / ' + date.getMonth() + ' / ' + date.getDate())
    }

const [isOpeningFrame7, setIsOpeningFrame7] = useState(false);

    const openFrame7 = () =>{
        setIsOpeningFrame7(true);
    }

    const closeFrame7 = () =>{
        setIsOpeningFrame7(false);
    }

    const render = () => {
        if(firebase.auth().currentUser){
            console.log('signed in as: ' + firebase.auth().currentUser?.email + '(ser ID: ' + firebase.auth().currentUser?.uid +  ')');
            return (
                <StyledDiv  margin='3% auto 0 auto'
                width='min( calc(683px + (100vw - 683px)*0.4 ), 100vw )'
                height='auto'
                backgroundColor='transparent'
                enableShadow={false}
                borderRadius={4}>

                    <AbsoluteBox>
                        <StyledDiv onClick={()=>openFrame7()} noDisplay={isOpeningFrame7}>
                            <HamburgerMenuButton isOpening={isOpeningFrame7}/>
                        </StyledDiv>
                    </AbsoluteBox>

                    <FlexBox    flexDirection='column'
                        alignItems='center'
                        justifyContent='space-around'>
                        <StyledDiv flexGrow={1} margin='30px 0 0 0 '>
                            <FlexBox alignItems='center'>
                                <StyledText size='2em' fontWeight='normal'>
                                    カレンダー
                                </StyledText>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={1} margin='0 0 0 0 '>
                            <FlexBox alignItems='center'>
                                <StyledText size='1.8em' fontWeight='normal'>
                                    {new Date().getFullYear()}
                                </StyledText>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={1} margin='0 0 0 0 '>
                            <FlexBox alignItems='center'>
                                <StyledText size='1.8em' fontWeight='normal'>
                                    {new Date().getMonth()+1}月
                                </StyledText>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={1} margin='0 0 0 0 '>
                            <FlexBox alignItems='center'>
                                <Calendar onClickDay={ ( date: Date )=> {onClickDay(date)}}/>
                            </FlexBox>
                        </StyledDiv>
                    </FlexBox>
                    <StyledDiv noDisplay={!isOpeningFrame7} >
                       <FixedBox>
                       <StyledDiv width='100vw' height='100vh' backgroundColor='rgba(0, 0, 0, 0.2)' >
                       <Frame7 closeFrame7={closeFrame7}/>
                       </StyledDiv>
                       </FixedBox>
                    </StyledDiv>
                </StyledDiv>
            );
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

export default Frame3;