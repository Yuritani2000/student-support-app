import React from 'react';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, StyledTextArea } from './StyledComponents';

const mockMemo = ['アルゴの課題について', '買い物リスト', 'チケットの予約', '欲しいものリスト', 'ポエム', 'ポエム2'];

const Frame13: React.FC = () => {




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
                <StyledDiv flexGrow={1} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                    <StyledButton width='3.5em'　height='2em' fontSize='1.5em' fontWeight='normal'>
                        戻る
                    </StyledButton>
                </StyledDiv>
                <StyledDiv flexGrow={2} margin='30px 0 0 0 '>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            メモを追加
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={20} width='95%' margin='20px 0 30px 0' >
                    <StyledInput    fontSize='1.5em'
                                    height='2em'
                                    width='100%'
                                    placeholder='題名'/>
                </StyledDiv>
                <StyledDiv flexGrow={20} width='95%' margin='20px 0 30px 0' >
                    <StyledTextArea id='textArea'
                                    fontSize='2em'
                                    height='10cm'
                                    width='100%'
                                    placeholder='メモ欄'
                                    resize='vertical'
                                    minWidth='100%'
                                    minHeight='10cm'/>
                </StyledDiv>
                <StyledDiv flexGrow={1} margin='0 30px 0 0 ' alignSelf='flex-end'>
                    <StyledButton height='1.5em' width='1.5em' fontSize='3em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='50%'>
                        +
                    </StyledButton>
                </StyledDiv>
            </FlexBox>
        </StyledDiv>
    );
} 

export default Frame13;