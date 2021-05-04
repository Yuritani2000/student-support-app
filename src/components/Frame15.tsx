import React, { useState} from 'react';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, StyledSelect } from './StyledComponents';

const Frame15: React.FC = () => {
    const [ subjectSelectDisabled, setSubjectSelectDisabled ] = useState(true);

    const mockSubjects = ['現代文', '古文', '漢文', '物理', '化学', '生物', '数学IA', '数学IIB', '数学III', '地理A', '地理B', '世界史A', '世界史B', '日本史A', '日本史B', '現代社会', '倫理', '家庭', '体育', '保健', '情報科学', 'アルゴリズムとデータ構造', 'プロジェクト学習'];

    const onChangeCategory = (value: string) => {
        if(value === 'homework'){
            setSubjectSelectDisabled(false);
        }else{
            setSubjectSelectDisabled(true);
        }
    }

    return (
        <StyledDiv  margin='10% auto 0 auto'
                    width='min( calc(683px + (100vw - 683px)*0.1 ), 100vw )'
                    height='13cm'
                    backgroundColor='#fefefe'
                    enableShadow={true}
                    borderRadius={4}>
            <FlexBox    flexDirection='column'
                        alignItems='center'
                        justifyContent='space-around'>
                <StyledDiv flexGrow={0.5} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                    <StyledButton  width='3.5em'　height='2em' fontSize='1.5em' fontWeight='normal'>
                        戻る
                    </StyledButton>
                </StyledDiv>
                <StyledDiv flexGrow={1}>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            課題追加
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={5} width='60%'>
                    <FlexBox flexDirection='column'>
                        <FlexBox alignItems='center'>
                            <StyledText width='8em' size='1.5em'>カテゴリー</StyledText>
                            <StyledSelect   onChange={(e)=> onChangeCategory(e.target.value)}
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'>
                                <option value='default'>カテゴリーを選択</option>
                                <option value='homework'>授業課題</option>
                                <option value='todo'>ToDo</option>
                            </StyledSelect>
                        </FlexBox>
                        <FlexBox alignItems='center'>
                            <StyledText width='8em' size='1.5em'>科目名</StyledText>
                            <StyledSelect   disabled={subjectSelectDisabled}
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'>
                                <option value='default'>科目を選択</option>
                                {
                                    mockSubjects.map((item) => {
                                        return <option value={item}>{item}</option>
                                    })
                                }
                            </StyledSelect>
                        </FlexBox>
                        <FlexBox alignItems='center'>
                            <StyledText width='8em' size='1.5em'>内容</StyledText>
                            <StyledInput    type='text'
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'
                                            placeholder='内容を入力'/>
                        </FlexBox>
                        <FlexBox alignItems='center'>
                            <StyledText width='8em' size='1.5em'>期限</StyledText>
                            <StyledInput   type='date'
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'
                                            placeholder='期限'/>
                        </FlexBox>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={2} width='50%' margin ='20px 0 0 0 '>
                    <StyledButton width='100%' height='2.0em' backgroundColor='#87cefa' fontSize='1.5em' fontWeight='bold' >
                        追加
                    </StyledButton>
                </StyledDiv>
            </FlexBox>
        </StyledDiv>
    );
}

export default Frame15;