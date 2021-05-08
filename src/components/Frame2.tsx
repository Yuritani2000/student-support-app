import React, { useState, useEffect } from 'react';
import { Parent, StyledDiv, FlexBox, StyledText, StyledInput, HoverElement, StyledButton, RelativeBox, AbsoluteBox, FixedBox} from './StyledComponents';
import firebase, { database } from '../firebase';
import { Redirect } from 'react-router-dom';
import HamburgerMenuButton from './HamburgerMenuButton';
import Frame7 from './Frame7';
import Frame8 from './Frame8';
import { time } from 'node:console';
import { start } from 'node:repl';
import { isConstructorDeclaration } from 'typescript';

const Frame2: React.FC = () => {

    enum timeInputTypes {
        Start,
        End
    }
        
    const array = [ [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];

    const [isOpeningFrame7, setIsOpeningFrame7] = useState(false);
    const [isOpeningFrame8, setIsOpeningFrame8] = useState(false);
    const [ clickedDay, setClickedDay ] = useState(0);
    const [ clickedPeriod, setClickedPeriod ] = useState(0);
    const [ timeOfPeriods, setTimeOfPeriods ] = useState(new Array<string>(8).fill('00:00-00:00'));

    const timeOfPeriodRef = database.ref('time_of_period');

    const openFrame7 = () =>{
        setIsOpeningFrame7(true);
    }

    const closeFrame7 = () =>{
        setIsOpeningFrame7(false);
    }

    const openFrame8 = (day: number, period: number) => {
        console.log('(' + day +  ', ' + period + ') clicked');
        if(day === 0 || period === 0) return;
        setClickedDay(day)
        setClickedPeriod(period);
        setIsOpeningFrame8(true);
    }

    const closeFrame8 = () => {
        setIsOpeningFrame8(false);
    }

    const onChangeTime = (startOrEnd: timeInputTypes, period: number, value: string) => {
        let newArray = [...timeOfPeriods];
        if(startOrEnd === timeInputTypes.Start){
            newArray[period-1] = value + newArray[period-1].slice(5, newArray[period-1].length);
        }else{
            newArray[period-1] = newArray[period-1].slice(0,6) + value;
        }
        console.log('newArray: ');
        console.log(newArray);
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;
        const timeListRef = timeOfPeriodRef.child(userId);
        if(!timeListRef) return;
        timeListRef.update(
            {
                "1": newArray[0],
                "2": newArray[1],
                "3": newArray[2],
                "4": newArray[3],
                "5": newArray[4],
                "6": newArray[5],
                "7": newArray[6],
                "8": newArray[7],
                "update_at": new Date().toString(),
            }
        );
    }

    useEffect(()=>{
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;
        const timeListRef = timeOfPeriodRef.child(userId);
        if(!timeListRef) return;
        timeListRef.on('value', (snapshot)=>{
            const timeList = snapshot.val();
            if(timeList === null) return;
            const entries = Object.entries(timeList);
            const gainedData = entries.map((data) => {
                const [ period, time ] = data;
                return time;
            });
            const gainedTimes: string[] = gainedData as string[];
            const filteredTimes: string[] = gainedTimes.filter((item, index) => index <= 7);
            console.log('filteredTimes: ');
            console.log(filteredTimes);
            setTimeOfPeriods(filteredTimes);
        })
    }, []);
    

    const days = ['', '月', '火', '水', '木', '金', '土'];

    const render = () =>{
        if(firebase.auth().currentUser){
            console.log('signed in as: ' + firebase.auth().currentUser?.email + '(ser ID: ' + firebase.auth().currentUser?.uid +  ')');
            return (
                <StyledDiv margin='5% auto 0 auto'>
                   
                    <AbsoluteBox>
                        <StyledDiv onClick={()=>openFrame7()} noDisplay={isOpeningFrame7}>
                            <HamburgerMenuButton isOpening={isOpeningFrame7}/>
                        </StyledDiv>
                    </AbsoluteBox>

                    <StyledDiv width='900px' height='800px' backgroundColor='transparent' margin='auto' enableShadow={false}>
                        <FlexBox flexDirection='column' alignItems='center' justifyContent='space-between'>
                                
                            <StyledDiv margin='auto' height='80px'>
                                <StyledText size='2em' fontWeight='normal'>
                                    時間割
                                </StyledText>
                            </StyledDiv>
                            <FlexBox>
                            {
                                array.map((innerArray, index)=>
                                    {
                                        return <FlexBox width='auto' flexDirection='column'>{innerArray.map( (value, innerIndex) => {
                                            return  <StyledDiv  onClick={()=>openFrame8(index, innerIndex)}
                                                                    width={(index===0) ? '180px' : '120px'}
                                                                    height='80px'
                                                                    isClickable={(innerIndex === 0) ? false : true}
                                                                    showBorder={true}
                                                                    borderTopWidth={0}
                                                                    borderRightWidth={(index === array.length-1 ) ? 0 : 1}
                                                                    borderBottomWidth={(innerIndex === innerArray.length-1 ) ? 0 : 1}
                                                                    borderLeftWidth={0}
                                                                    borderColor='#c0c0c0'>
                                                                        {(index === 0 && innerIndex === 0) ? 
                                                                            <StyledText>時間</StyledText>
                                                                        : (index === 0) ? 
                                                                            <StyledDiv>
                                                                                <FlexBox    flexDirection='row'
                                                                                            alignItems='center'
                                                                                            justifyContent='space-around'>
                                                                                    <StyledInput value={timeOfPeriods[innerIndex-1].slice(0, 5)} onChange={(e)=>{onChangeTime(timeInputTypes.Start, innerIndex, e.target.value)}} type='time' width='70px'  fontSize='1.1em'/>
                                                                                    <StyledText>～</StyledText>
                                                                                    <StyledInput value={timeOfPeriods[innerIndex-1].slice(6, timeOfPeriods[innerIndex-1].length)} onChange={(e)=>{onChangeTime(timeInputTypes.End, innerIndex, e.target.value)}}type='time'  width='70px' fontSize='1.1em'/>
                                                                                </FlexBox>
                                                                            </StyledDiv>
                                                                        : (innerIndex === 0) ? 
                                                                            <StyledDiv>
                                                                                <FlexBox    justifyContent='space-around'>
                                                                                    <StyledText size='1.5em' fontWeight='bold'>{days[index]}</StyledText>
                                                                                </FlexBox>
                                                                            </StyledDiv>
                                                                        : 
                                                                                <StyledButton width='100%' height='100%' backgroundColor='#fefefe' fontSize='1.5em' disableShadow={true} enableHoverEvent={true}>
                                                                                    +
                                                                                </StyledButton>}
                                                        </StyledDiv>
                                        })}
                                        </FlexBox>
                                    }
                                )
                            }
                            </FlexBox>
                        </FlexBox>
                    </StyledDiv>

                    <StyledDiv noDisplay={!isOpeningFrame7} >
                       <FixedBox>
                         <StyledDiv width='100vw' height='100vh' backgroundColor='rgba(0, 0, 0, 0.2)' >
                           <Frame7 closeFrame7={closeFrame7}/>
                         </StyledDiv>
                       </FixedBox>
                    </StyledDiv>

                    <StyledDiv noDisplay={!isOpeningFrame8}>
                        <FixedBox>
                            <StyledDiv width='100vw' height='100vh' backgroundColor='#f5f5f5'/>
                        </FixedBox>
                    </StyledDiv>
                    <StyledDiv noDisplay={!isOpeningFrame8}>
                        <AbsoluteBox top='5%' left='50%' translateX={-50} translateY={0}>
                            <Frame8 clickedDay={clickedDay} clickedPeriod={clickedPeriod} closeFrame8={closeFrame8}/>
                        </AbsoluteBox>
                    </StyledDiv>

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
    )
}

export default Frame2;