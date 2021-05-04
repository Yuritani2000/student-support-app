import React from 'react';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, StyledTextArea } from './StyledComponents';
import Calendar from 'react-calendar';

const mockMemo = ['アルゴの課題について', '買い物リスト', 'チケットの予約', '欲しいものリスト', 'ポエム', 'ポエム2'];

const Frame3: React.FC = () => {




    return (
        <StyledDiv  margin='3% auto 0 auto'
        width='min( calc(683px + (100vw - 683px)*0.4 ), 100vw )'
        height='auto'
        backgroundColor='transparent'
        enableShadow={false}
        borderRadius={4}>
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
                        <Calendar/>
                    </FlexBox>
                </StyledDiv>
            </FlexBox>
        </StyledDiv>
    );
} 

export default Frame3;