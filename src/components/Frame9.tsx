import React from 'react';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput } from './StyledComponents';
import firebase, { database } from '../firebase';

type Frame9Props = {
    closeFrame9: () => void;
}

const Frame9: React.FC<Frame9Props> = (props) => {
    const { closeFrame9 } = props;

    const 

    return (
        <StyledDiv  margin='10% auto 0 auto'
                    width='min( calc(683px + (100vw - 683px)*0.1 ), 100vw )'
                    height='10cm'
                    backgroundColor='#fefefe'
                    enableShadow={true}
                    borderRadius={4}>
            <FlexBox    flexDirection='column'
                        alignItems='center'
                        justifyContent='space-around'>
                <StyledDiv flexGrow={1} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                    <StyledButton  onClick={()=> {closeFrame9()}} width='3.5em'　height='2em' fontSize='1.5em' fontWeight='normal'>
                        戻る
                    </StyledButton>
                </StyledDiv>
                <StyledDiv flexGrow={2}>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            新しい科目を登録
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={2} width='60%'>
                    <StyledInput    width='100%'
                                    fontSize='1.5em'
                                    height='2.0em'
                                    placeholder='科目を入力してください。'/>
                </StyledDiv>
                <StyledDiv flexGrow={2} width='50%'>
                    <StyledButton width='100%' height='2.0em' backgroundColor='#87cefa' fontSize='1.5em' fontWeight='bold' >
                        登録
                    </StyledButton>
                </StyledDiv>
            </FlexBox>
        </StyledDiv>
    );
}

export default Frame9;