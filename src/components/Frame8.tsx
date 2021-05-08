import React, { useState, useEffect } from 'react';
import { AbsoluteBox, FlexBox, HoverElement, RelativeBox, StyledButton, StyledDiv, StyledText } from './StyledComponents';
import Frame9 from './Frame9';
import firebase, { database } from '../firebase';
import { OneSubjectDataType } from '../DataTypes/SubjectTypes';

const Frame8:React.FC = () => {
    const [ isOpeningFrame9, setIsOpeningFrame9 ] = useState(false);
    const [ subjectList, setSubjectList ] = useState([] as OneSubjectDataType[]);

    const subjectRef = database.ref('subject');

    const openFrame9 = () => {
        setIsOpeningFrame9(true);
    }
    
    const closeFrame9 = () => {
        setIsOpeningFrame9(false);
    }

    const mockSubjects = ['現代文', '古文', '漢文', '物理', '化学', '生物', '数学IA', '数学IIB', '数学III', '地理A', '地理B', '世界史A', '世界史B', '日本史A', '日本史B', '現代社会', '倫理', '家庭', '体育', '保健', '情報科学', 'アルゴリズムとデータ構造', 'プロジェクト学習'];

    useEffect(()=>{
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;
        const subjectListRef = subjectRef.child(userId);
        if(!subjectListRef) return;
        subjectListRef.on('value', (snapshot) => {
            const subjects = snapshot.val();
            if(subjects === null) return;
            const entries = Object.entries(subjects);
            const gainedData = entries.map((data) => {
                const [ id, task ] = data;
                return { id: id, content: task }
            })
            console.log(gainedData)
            const gainedSubjects: OneSubjectDataType[] = gainedData as OneSubjectDataType[];
            console.log(gainedSubjects);
            setSubjectList(gainedSubjects);
        });
    }, []);

    return (
        <StyledDiv margin='5% 0 0 0'>
            <StyledDiv  backgroundColor='transparent' 
                        enableShadow={false}
                        width='min( calc(683px + (100vw - 683px)*0.5 ), 100vw )'
                        height='auto'
                        margin='auto'
                        borderRadius={4}>
                    <FlexBox    alignItems='center'
                                justifyContent='space-around'
                                flexDirection='column'>
                        <StyledDiv flexGrow={1} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                            <StyledButton width='3.5em'　height='2em' fontSize='1.5em' fontWeight='normal'>
                                戻る
                            </StyledButton>
                        </StyledDiv>
                        <StyledDiv flexGrow={1} >
                            <FlexBox alignItems='center'>
                                <StyledText fontWeight='normal' size='2em' >
                                    時間割追加
                                </StyledText>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={1} height='4em' margin='0 20px 20px 0 ' alignSelf='flex-end'>
                            <StyledButton onClick={()=>{ openFrame9() }} height='1.5em' width='1.5em' fontSize='3em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='50%'>
                                +
                            </StyledButton>
                        </StyledDiv>
                        <StyledDiv flexGrow={20} width='100%' margin='0 0 30px 0' backgroundColor='#fefefe' enableShadow={true} borderRadius={4}>
                            <StyledDiv flexGrow={20} width='95%' margin='0 10px 0 20px' backgroundColor='transparent'>
                                <FlexBox flexDirection='row' flexWrap='wrap'>
                                    {
                                        subjectList.map((item) => {
                                            return  <StyledDiv key={item.id} enableShadow={true} margin='20px 20px 20px 0' isClickable={true} backgroundColor='#fefefe'>
                                                        <HoverElement disableShadow={true} width='auto'>
                                                            <FlexBox justifyContent='space-around' flexDirection='column' alignItems='center' width={ item.content.name.length*2.5 + 'em'} height='4em'>
                                                                <StyledText size='2em' isClickable={true}>
                                                                    {item}
                                                                </StyledText>
                                                            </FlexBox>
                                                        </HoverElement>
                                                    </StyledDiv>
                                        })
                                    }
                                </FlexBox>
                            </StyledDiv>
                        </StyledDiv>
                    </FlexBox>
            </StyledDiv>
            <AbsoluteBox top='0%' left='0%'>
                <StyledDiv width='100vw' height='100vh' backgroundColor='rgba(0, 0, 0, 0.2)' noDisplay={!isOpeningFrame9}>
                    <AbsoluteBox top='0%' left='50%' translateX={-50} translateY={0}>
                        <Frame9 closeFrame9={closeFrame9}/>
                    </AbsoluteBox>
                </StyledDiv>
            </AbsoluteBox>
        </StyledDiv>
    );
}

export default Frame8;