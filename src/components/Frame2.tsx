import React from 'react';
import { Parent, StyledDiv, FlexBox, StyledText, StyledInput, HoverElement, StyledButton, RelativeBox, AbsoluteBox} from './StyledComponents';

const Frame2: React.FC = () => {
        
    const array = [ [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];

    const handleClickMatrix = (day: number, period: number) => {
        console.log('(' + day +  ', ' + period + ') clicked');
    }

    const days = ['', '月', '火', '水', '木', '金', '土'];

    return (
        <StyledDiv margin='5% auto 0 auto'>
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
                                    return  <StyledDiv  onClick={()=>handleClickMatrix(index, innerIndex)}
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
                                                                            <StyledInput type='time' width='70px'  fontSize='1.1em'/>
                                                                            <StyledText>～</StyledText>
                                                                            <StyledInput type='time'  width='70px' fontSize='1.1em'/>
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
        </StyledDiv>
    )
}

export default Frame2;