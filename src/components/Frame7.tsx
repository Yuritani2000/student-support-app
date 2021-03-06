import React from 'react';
import { HamburgerMenuBase, FlexBox, RelativeBox, AbsoluteBox, StyledText, HoverElement, StyledDiv } from './StyledComponents';
import HamburgerMenuButton from './HamburgerMenuButton';
import { useHistory } from "react-router-dom";
import firebase from '../firebase';
import { Redirect } from 'react-router-dom';

type Frame7Props = {
    closeFrame7: () => void;   
}

const Frame7: React.FC<Frame7Props> = (props) => {
    
    const history = useHistory();

    const ToTimetable = () =>{
        history.push("/frame2")
    } 

    const ToCalendar = () =>{
        history.push("/frame3")
    }

    const ToNote = () =>{
        history.push("/frame4")
    }

    const ToTaskList = () =>{
        history.push("/frame10")
    }

    const ToSubjectList = () =>{
        history.push("/frame11")
    }

    const onClickSignOut = () => { 
        const user = firebase.auth().currentUser;
        if(!user) return;
        firebase.auth().signOut().then(()=>{
            console.log('successfully signed out.');
            return <Redirect to='/frame1'/>
        }).catch((error) => {
            console.log('sign out failed.')
        })
    }

    const { closeFrame7 } = props;
    
    return (
             <StyledDiv>
                   <RelativeBox>
                        <HamburgerMenuBase isClosed={false}>
                    <RelativeBox>
                   
                    <StyledDiv onClick={()=>closeFrame7()}>
                        <HamburgerMenuButton isOpening={true}/>
                    </StyledDiv>
                   
                    <AbsoluteBox width='70%' height='50%' top='50%' left='50%' translateX={-50} translateY={-50}> 
                        <FlexBox 
                                    flexDirection='column'
                                    justifyContent='space-around'>
                            <HoverElement>
                                <StyledText onClick={()=>ToTimetable()} size='1.5em' width='100%' isClickable={true}>
                                    ?????????
                                </StyledText>
                            </HoverElement>
                            <HoverElement>
                                <StyledText onClick={()=>ToCalendar()} size='1.5em' width='100%' isClickable={true}>
                                    ???????????????
                                </StyledText>
                            </HoverElement>
                            <HoverElement>
                                <StyledText onClick={()=>ToNote()} size='1.5em' width='100%' isClickable={true}>
                                    ?????????
                                </StyledText>
                            </HoverElement>
                            <HoverElement>
                                <StyledText onClick={()=>ToTaskList()} size='1.5em' width='100%' isClickable={true}>
                                    ????????????
                                </StyledText>
                            </HoverElement>
                            <HoverElement>
                                <StyledText onClick={()=>ToSubjectList()} size='1.5em' width='100%' isClickable={true}>
                                    ????????????
                                </StyledText>
                            </HoverElement>
                        </FlexBox>
                    </AbsoluteBox>
                    <AbsoluteBox width='9em' top='98%' left='98%' translateX={-100} translateY={-100}>
                        <HoverElement backgroundColor='#d2d2d2'>
                            <StyledText onClick={()=> {onClickSignOut()}} size='1.5em' isClickable={true}>
                                ??????????????????
                            </StyledText>
                        </HoverElement>
                    </AbsoluteBox>
                </RelativeBox>
            </HamburgerMenuBase>
        </RelativeBox>
     </StyledDiv>
    )
}

export default Frame7;