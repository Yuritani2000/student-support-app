<<<<<<< HEAD
import React, { useState } from 'react';
import firebase from '../firebase';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, HoverElement2, StyledSelect ,AbsoluteBox, FixedBox} from './StyledComponents';
=======
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import firebase, { memoRef } from '../firebase';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, HoverElement2, StyledSelect, AbsoluteBox} from './StyledComponents';
>>>>>>> 843143e... [rebase]develop
=======
import firebase, { database } from '../firebase';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, HoverElement2, StyledSelect, AbsoluteBox,FixedBox} from './StyledComponents';
>>>>>>> 8e8a653... [rebase]develop
import { Redirect } from 'react-router-dom';
import HamburgerMenuButton from './HamburgerMenuButton';
import Frame7 from './Frame7';

//const mockMemo = ['アルゴの課題について', '買い物リスト', 'チケットの予約', '欲しいものリスト', 'ポエム', 'ポエム2'];

const Frame10: React.FC = () => {

<<<<<<< HEAD
    const [isOpeningFrame7, setIsOpeningFrame7] = useState(false);
=======
    const memoRef = database.ref('memo');
    const [ isOpeningFrame13, setIsOpeningFrame13 ] = useState(false);  // frame13が開いているかを管理する
    const [ memos, setMemos ] = useState([] as MemoDataType[]);   // メモのデータが配列になって入っている。この配列データの型定義は別ファイルを参照。   
    const [ memoId, setMemoId ] = useState(''); 
    /* frame13を開く関数 */
    const openFrame13 = (selectedMemo?:string) => {
        setIsOpeningFrame13(true);
        if(!selectedMemo){
            return
        }
        setMemoId(selectedMemo);
    }
>>>>>>> 8e8a653... [rebase]develop

    const openFrame7 = () =>{
        setIsOpeningFrame7(true);
    }
<<<<<<< HEAD

    const closeFrame7 = () =>{
        setIsOpeningFrame7(false);
=======
    
    const deleteMemo = (targetId: string) => {
        // ユーザーのタスクデータへの参照を取得
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;

        // 現在のメモ一覧から、対象のメモを取得
        const targetMemo = memos.find((item) => item.id === targetId);
        if(!targetMemo) return;
        // 対象のメモへの参照を取得
        const listRef = memoRef.child(userId);
        const targetRef = listRef.child('/' + targetMemo.id);
        if(!targetRef) return;
        // データベース上から対象のタスクを削除
        targetRef.remove();
        // 一つしかないデータを削除したときは何故かuseEffectのonが呼ばれない。
        // あまり良くない方法だが変更がDBに反映されたことを前提として表示を消去する。
        if(memos.length === 1) setMemos([]);
>>>>>>> 8e8a653... [rebase]develop
    }

    useEffect(()=>{
        // ユーザーの情報を取得。それぞれnullチェックを行う。
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;
        // pathを指定して、データへの参照を取得。
        const listRef = memoRef.child(userId);
        if(!listRef) return;
        // onメソッドは、参照先のデータを取得するメソッド。
        listRef.on('value', (snapshot) => {
            const memos = snapshot.val();
            if(memos === null) return;
            // entriesには、オブジェクトのキー値（自動生成されたもの）と、中身の値（オブジェクト）のペアが配列になって返ってくるようだ。
            const entries = Object.entries(memos);
            // entriesをオブジェクトに直す
            const gainedData = entries.map((data) => {
                const [ id, memo ] = data;
                return { id: id, content: memo }
            })
            // stateにデータを保持
            // gainedDataは型が決まっていないので、DataTypeにキャストする。
            const gainedMemos: MemoDataType[] = gainedData as MemoDataType[];
            setMemos(gainedMemos);
        })
    }, []);

    const render = () => {
        if(firebase.auth().currentUser){
            console.log('signed in as: ' + firebase.auth().currentUser?.email);
            return (
                <StyledDiv  margin='5% auto 0 auto'
                width='min( calc(683px + (100vw - 683px)*0.4 ), 100vw )'
                height='auto'
                backgroundColor='transparent'
                enableShadow={false}
                borderRadius={4}>

                    <AbsoluteBox>
                        <StyledDiv onClick={()=>openFrame7()} noDisplay={isOpeningFrame7}>
                            <HamburgerMenuButton isOpening={isOpeningFrame7}/>
                        </StyledDiv>
                    </AbsoluteBox>

                    <FlexBox    flexDirection='column'
                        alignItems='center'
                        justifyContent='space-around'>
                        <StyledDiv flexGrow={2} margin='30px 0 0 0 '>
                            <FlexBox alignItems='center'>
                                <StyledText size='1.8em' fontWeight='normal'>
                                    メモ帳
                                </StyledText>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={1} margin='0 30px 0 0 ' alignSelf='flex-end'>
                            <StyledButton onClick={()=>{ openFrame13() }} height='1.5em' width='1.5em' fontSize='3em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='50%'>
                                +
                            </StyledButton>
                        </StyledDiv>
                        <StyledDiv flexGrow={20} width='95%' margin='0 0 30px 0' >
                            <FlexBox flexDirection='column' >
                                {
                                    memos.map((item) => {
                                        return  <StyledDiv onClick={() =>{openFrame13(item.id)}}width='100%' enableShadow={true} margin='20px 20px 0 0' isClickable={true} backgroundColor='#fefefe' borderRadius={4}>
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
<<<<<<< HEAD
                    <StyledDiv noDisplay={!isOpeningFrame7} >
                       <FixedBox>
                         <StyledDiv width='100vw' height='100vh' backgroundColor='rgba(0, 0, 0, 0.2)' >
                           <Frame7 closeFrame7={closeFrame7}/>
                         </StyledDiv>
                       </FixedBox>
=======
                    <StyledDiv noDisplay={!isOpeningFrame13}> 
<<<<<<< HEAD
                        <AbsoluteBox top='0%' left='0%'>
                            <StyledDiv width='100vw' height='100vh' backgroundColor='rgba(0,0,0,0.2)'>
                                <AbsoluteBox top='0%' left='50%' translateX={-50} translateY={0}>
                                    <Frame13 closeFrame13={closeFrame13}/>
                                </AbsoluteBox>
                            </StyledDiv>
                        </AbsoluteBox>
>>>>>>> 843143e... [rebase]develop
=======
                        <FixedBox top='0%' left='0%'>
                        <StyledDiv width='100vw' height='100vh' backgroundColor='rgba(0,0,0,0.2)'/>
                    </FixedBox>
>>>>>>> 8e8a653... [rebase]develop
                    </StyledDiv>
                    <AbsoluteBox top='0%' left='50%' translateX={-50} translateY={0}>
                        <StyledDiv noDisplay={!isOpeningFrame13}>
                            <Frame13 closeFrame13={closeFrame13} selectedMemo={memoId}/>
                        </StyledDiv>
                    </AbsoluteBox>
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

export default Frame10;