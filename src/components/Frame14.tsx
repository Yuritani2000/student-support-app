import React from 'react';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, HoverElement2, StyledSelect } from './StyledComponents';
import CheckButton from './CheckButton';

const mockHomework = ['教科書演習問題1', 'アドバンスプラスp.22-p.24']

const mockMemo = ['アルゴの課題について', '買い物リスト', 'チケットの予約', '欲しいものリスト', 'ポエム', 'ポエム2'];

const Frame14: React.FC = () => {

    const subjectName: string = '数学';

    return (
        <StyledDiv  margin='0% auto 0 auto'
        width='min( calc(683px + (100vw - 683px)*0.4 ), 100vw )'
        height='auto'
        backgroundColor='transparent'
        enableShadow={false}
        borderRadius={4}>
            <FlexBox    flexDirection='column'
                alignItems='center'
                justifyContent='space-around'>
                <StyledDiv flexGrow={1} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                    <StyledButton  width='3.5em'　height='2em' fontSize='1.5em' fontWeight='normal'>
                        戻る
                    </StyledButton>
                </StyledDiv>
                <StyledDiv flexGrow={2} margin='30px 0 0 0 '>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            {subjectName}
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={2} margin='30px 0 0 0 ' alignSelf='flex-start'>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            課題一覧
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={1} margin='0 30px 0 0 ' alignSelf='flex-end' >
                    <FlexBox>
                        <StyledButton height='1.5em' width='1.5em' fontSize='3em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='50%'>
                            +
                        </StyledButton>
                    </FlexBox>
                </StyledDiv>
                <FlexBox justifyContent='space-around'>
                    <StyledDiv flexGrow={1} width='5em'　margin='0 0 0 20%' alignSelf='flex-start'>
                        <StyledText size='1.7em'>
                            課題名
                        </StyledText>
                    </StyledDiv>
                    <StyledDiv flexGrow={1} width='5em' margin='0 0 0 10%' alignSelf='flex-start'>
                        <StyledText size='1.7em'>
                            期限
                        </StyledText>
                    </StyledDiv>
                </FlexBox>
                <StyledDiv flexGrow={20} width='95%' margin='0 0 30px 0' >
                    <FlexBox flexDirection='column' >
                        {
                            mockHomework.map((item) => {
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
                <StyledDiv flexGrow={1} margin='30px 0 0 0 ' alignSelf='flex-start'>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            メモ帳
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={1} margin='0 30px 0 0 ' alignSelf='flex-end'>
                    <StyledButton height='1.5em' width='1.5em' fontSize='3em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='50%'>
                        +
                    </StyledButton>
                </StyledDiv>
                <StyledDiv flexGrow={20} width='95%' margin='0 0 30px 0' >
                    <FlexBox flexDirection='column' >
                        {
                            mockMemo.map((item) => {
                                return  <StyledDiv width='100%' enableShadow={true} margin='20px 20px 0 0' isClickable={true} backgroundColor='#fefefe' borderRadius={4}>
                                            <FlexBox justifyContent='space-around' flexDirection='row' alignItems='center' height='4.5em' >
                                                <StyledText size='1.7em' isClickable={true} width='95%' >
                                                    {item}
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
    );
} 

export default Frame14;