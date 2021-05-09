import React, { useState, useEffect } from 'react';
import firebase, { database } from '../firebase';
import { CalendarType } from 'react-calendar';
import { Redirect } from 'react-router-dom';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, HoverElement2, AbsoluteBox} from './StyledComponents';
import { CalendarMemoDataType} from '../DataTypes/CalendarMemoTypes';
import  Frame17  from './Frame17';

const mockMemo = ['アルゴの課題について', '買い物リスト', 'チケットの予約', '欲しいものリスト', 'ポエム', 'ポエム2'];

type Frame16Props = {
    closeFrame16: () => void;
    stringDay: string;
    isOpeningFrame16: boolean;
}

const Frame16: React.FC<Frame16Props> = (props) => {

    const { closeFrame16, stringDay, isOpeningFrame16 } = props;

    const [isOpeningFrame17, setIsOpeningFrame17] = useState(false);

    const [ selectedCalendarMemo, setSelectedCalendarMemo ] = useState('');

    const openingFrame17 = (selectedMemo?:string) => {
        setIsOpeningFrame17(true);
        if(!selectedMemo){
         setSelectedCalendarMemo('');
        return;
        }
        setSelectedCalendarMemo(selectedMemo);
    }
    
    const closingFrame17 = () => {
        setIsOpeningFrame17(false);
    }

    const [calendarMemo, setCalendarMemo] = useState([] as CalendarMemoDataType[]);

    const calendarRef = database.ref('calendar');

    const deleteCalendarMemo = (targetId: string) => {
        
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;

        const targetTask = calendarMemo.find((item) => item.id === targetId);
        if(!targetTask) return;
        const listRef = calendarRef.child(userId);
        const targetRef = listRef.child(stringDay).child('/' + targetTask.id);
        if(!targetRef) return;
        targetRef.remove();
        if(calendarMemo.length === 1) setCalendarMemo([]);
    }

    useEffect(() => {
        const user = firebase.auth().currentUser;
        if (!user) return;
        const userId = user.uid;
        if (!userId) return;
        const StringDay = stringDay;
        if (!StringDay) return;
        const listRef = calendarRef.child(userId).child(StringDay);
        if (!listRef) return 

        listRef.on('value', (snapshot) => {
            const calendarMemo = snapshot.val();
            if (calendarMemo === null) return setCalendarMemo([]);

            const entries = Object.entries(calendarMemo);
            const gainedData = entries.map((data) => {
                const [id, memo] = data;
                return { id: id, content: memo }
            })
            const gainedMemos: CalendarMemoDataType[] = gainedData as CalendarMemoDataType[];
            console.log(StringDay);
            setCalendarMemo(gainedMemos);
        })
    }, [isOpeningFrame16]);

    const render = () => {
        if (firebase.auth().currentUser) {
            console.log('signed in as: ' + firebase.auth().currentUser?.email);
            return (
                <StyledDiv margin='0% auto 0 auto'
                    width='min( calc(683px + (100vw - 683px)*0.4 ), 100vw )'
                    height='auto'
                    backgroundColor='transparent'
                    enableShadow={false}
                    borderRadius={4}>
                    <FlexBox flexDirection='column'
                        alignItems='center'
                        justifyContent='space-around'>
                        <StyledDiv flexGrow={1} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                            <StyledButton onClick={() => closeFrame16()} width='3.5em' height='2em' fontSize='1.5em' fontWeight='normal'>
                                戻る
                    </StyledButton>
                        </StyledDiv>
                        <StyledDiv flexGrow={2} margin='30px 0 0 0 '>
                            <FlexBox alignItems='center'>
                                <StyledText size='2em' fontWeight='normal'>
                                    {stringDay}
                                </StyledText>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={1} margin='0 30px 0 0 ' alignSelf='flex-end'>
                            <StyledButton onClick={() => openingFrame17()} height='1.5em' width='1.5em' fontSize='3em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='50%'>
                                +
                    </StyledButton>
                        </StyledDiv>
                        <StyledDiv flexGrow={20} width='95%' margin='0 0 30px 0' >
                            <FlexBox flexDirection='column' >
                                {
                                    calendarMemo.map((item) => {
                                        return <StyledDiv width='100%' enableShadow={true} margin='20px 20px 0 0' isClickable={true} backgroundColor='#fefefe' borderRadius={4}>
                                            <FlexBox justifyContent='space-around' flexDirection='row' alignItems='center' height='4.5em' >
                                                <StyledText  onClick={() => openingFrame17(item.id)} size='1.7em' isClickable={true} width='95%' >
                                                    {item.content.title}
                                                </StyledText>
                                                <StyledButton onClick={() => deleteCalendarMemo(item.id)} width='4.5em' height='4.5rem' fontSize='1.2em' fontColor='#fefefe' fontWeight='bold' backgroundColor='#ff4500' borderRadius='4px'>
                                                    削除
                                                </StyledButton>
                                            </FlexBox>
                                        </StyledDiv>

                                    })
                                }
                            </FlexBox>
                        </StyledDiv>
                    </FlexBox>
                    <StyledDiv noDisplay={!isOpeningFrame17} >
                       <AbsoluteBox>
                         <StyledDiv width='100vw'  backgroundColor='#f5f5f5' >
                           <Frame17 closingFrame17={closingFrame17} stringDay={stringDay} selectedCalendarMemo={selectedCalendarMemo} isOpeningFrame17={isOpeningFrame17}/>
                         </StyledDiv>
                       </AbsoluteBox>
                    </StyledDiv>
                </StyledDiv>
            );
        } else {
            return <Redirect to='/frame1' />
        }
    }

    return (
        <>
            {render()}
        </>
    );
}

export default Frame16;