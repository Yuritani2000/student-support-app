import React, { useState, useEffect} from 'react';
import firebase, { database } from '../firebase';
import { AbsoluteBox, FlexBox, HoverElement, RelativeBox, StyledButton, StyledDiv, StyledText, FixedBox} from './StyledComponents';
import { Redirect } from 'react-router-dom';
import HamburgerMenuButton from './HamburgerMenuButton';
import Frame7 from './Frame7';
import { OneSubjectDataType } from '../DataTypes/SubjectTypes';
import Frame14 from './Frame14';

const Frame11:React.FC = () => {

   // const mockSubjects = ['現代文', '古文', '漢文', '物理', '化学', '生物', '数学IA', '数学IIB', '数学III', '地理A', '地理B', '世界史A', '世界史B', '日本史A', '日本史B', '現代社会', '倫理', '家庭', '体育', '保健', '情報科学', 'アルゴリズムとデータ構造', 'プロジェクト学習'];

    const [isOpeningFrame7, setIsOpeningFrame7] = useState(false);
    const [isOpeningFrame14, setIsOpeningFrame14] = useState(false);
    const [ subjects, setSubjects ] = useState([] as OneSubjectDataType[]);
    const [ selectedSubject, setSelectedSubject] = useState('');

    const subjectRef = database.ref('subject');

    const openFrame7 = () =>{
        setIsOpeningFrame7(true);
    }

    const closeFrame7 = () =>{
        setIsOpeningFrame7(false);
    }

    const openFrame14 = (selectedSubject?:string) =>{
        setIsOpeningFrame14(true);
        if(!selectedSubject){
            return;
        }
        setSelectedSubject(selectedSubject);
    }

    const closeFrame14 = () =>{
        setIsOpeningFrame14(false);
    }

    /*const handleClickMatrix = (day: number, period: number) => {
        console.log('(' + day +  ', ' + period + ') clicked');
    }*/
    
    useEffect(()=>{
        // ユーザーの情報を取得。それぞれnullチェックを行う。
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;
        // pathを指定して、データへの参照を取得。
        const listRef = subjectRef.child(userId);
        if(!listRef) return;
        // onメソッドは、参照先のデータを取得するメソッド。
        listRef.on('value', (snapshot) => {
            const subjects = snapshot.val();
            if(subjects === null) return;
            // entriesには、オブジェクトのキー値（自動生成されたもの）と、中身の値（オブジェクト）のペアが配列になって返ってくるようだ。
            const entries = Object.entries(subjects);
            // entriesをオブジェクトに直す
            const gainedData = entries.map((data) => {
                const [ id, subject ] = data;
                return { id: id, content: subject }
            })
            // stateにデータを保持
            // gainedDataは型が決まっていないので、DataTypeにキャストする。
            const gainedSubjects: OneSubjectDataType[] = gainedData as OneSubjectDataType[];
            setSubjects(gainedSubjects);
        })
    }, []);
    

    const render = () => {
        if(firebase.auth().currentUser) {
            console.log('signed in as: ' + firebase.auth().currentUser?.email);
            return (
                <StyledDiv margin='5% 0 0 0'>

                    <AbsoluteBox>
                       <StyledDiv onClick={()=>openFrame7()} noDisplay={isOpeningFrame7}>
                            <HamburgerMenuButton isOpening={isOpeningFrame7}/>
                        </StyledDiv>
                    </AbsoluteBox>

                    <StyledDiv  backgroundColor='transparent' 
                                enableShadow={false}
                                width='min( calc(683px + (100vw - 683px)*0.5 ), 100vw )'
                                height='auto'
                                margin='auto'
                                borderRadius={4}>
                            <FlexBox    alignItems='center'
                                        justifyContent='space-around'
                                        flexDirection='column'>
                                <StyledDiv flexGrow={1} >
                                    <FlexBox alignItems='center'>
                                        <StyledText fontWeight='normal' size='2em' >
                                            科目一覧
                                        </StyledText>
                                    </FlexBox>
                                </StyledDiv>
                                <StyledDiv flexGrow={20} width='100%' margin='30px 0 30px 0' backgroundColor='#fefefe' enableShadow={true} borderRadius={4}>
                                    <StyledDiv flexGrow={20} width='95%' margin='0 10px 0 20px' backgroundColor='transparent'>
                                        <FlexBox flexDirection='row' flexWrap='wrap'>
                                            {
                                                subjects.map((item) => {
                                                    return  <StyledDiv enableShadow={true} margin='20px 20px 20px 0' isClickable={true} backgroundColor='#fefefe'>
                                                                <HoverElement disableShadow={true} width='auto'>
                                                                    <FlexBox justifyContent='space-around' flexDirection='column' alignItems='center' width={ item.content.name.length*2.5 + 'em'} height='4em'>
                                                                        <StyledText onClick={()=>{ openFrame14(item.id)}} size='2em' isClickable={true}>
                                                                        {item.content.name}
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
                    <StyledDiv noDisplay={!isOpeningFrame14}> 
                        <AbsoluteBox top='0%' left='0%'>
                            <StyledDiv width='100vw' height='100vh' backgroundColor='rgb(245, 245, 245)'>
                                <AbsoluteBox top='0%' left='50%' translateX={-50} translateY={0}>
                                    <Frame14 closeFrame14={() => {closeFrame14()}} selectedSubject={selectedSubject} isOpeningFrame14={isOpeningFrame14}/>
                                </AbsoluteBox>
                            </StyledDiv>
                        </AbsoluteBox>
                    </StyledDiv>
                    <StyledDiv noDisplay={!isOpeningFrame7} >
                       <FixedBox>
                         <StyledDiv width='100vw' height='100vh' backgroundColor='rgba(0, 0, 0, 0.2)' >
                           <Frame7 closeFrame7={closeFrame7}/>
                         </StyledDiv>
                       </FixedBox>
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
    );
}

export default Frame11;