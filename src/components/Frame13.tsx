import React, { useState, useEffect } from 'react';
//import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, StyledTextArea } from './StyledComponents';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, StyledTextArea, HoverElement2, StyledSelect, AbsoluteBox,FixedBox} from './StyledComponents';
import firebase, { database } from '../firebase';
import { MemoType } from '../DataTypes/MemoDataTypes';



type Frame13Props = {
    closeFrame13: () => void;   // frame15を閉じるための関数。
    selectedMemo?: string; //選択肢したメモのidを渡す変数
}

const Frame13: React.FC<Frame13Props> = (props) => {

    const { closeFrame13, selectedMemo } = props;
    const memoRef = database.ref('memo');
    const [ title, setTitle ] = useState('');
    const [ contents, setContents ] = useState('');


    const onChangeTitle = (value: string) => {
        setTitle(value);
    }

    /* タスク内容の入力値が変更されたときに呼ばれる */
    const onChangeContents = (value: string) => {
        setContents(value);
    }

  //  useEffect(checkSubmittable, [category, subjectId, taskName, deadline]);


    const push = () => {
        const now = new Date(); // タイムスタンプ用のdateオブジェクト
        const currentTimeStamp = now.getTime(); // 1970年からの現在の時刻を、ミリ秒単位で取得する。
        const user = firebase.auth().currentUser;   // 現在ログインしているユーザーを取得する。
        if(!user){/* nullチェック */ return; }
        const userId = user.uid;// ユーザーIDの取得
        if(!userId){/* nullチェック */ return; }
        console.log('post todo as: ' + userId);
        const listRef = memoRef.child(userId);
        const newObject: MemoType = {
            title: title,
            contents: contents,
            create_at: now.toString(), 
            update_at:  now.toString(),
        }
        if(!listRef) return;
        listRef.push(newObject);
    }



    return (
        <StyledDiv  margin='5% auto 0 auto'
        width='min( calc(683px + (100vw - 683px)*0.4 ), 100vw )'
        height='auto'
        backgroundColor='#f5f5f5'
        enableShadow={true}
        borderRadius={4}>
            <FlexBox    flexDirection='column'
                alignItems='center'
                justifyContent='space-around'>
                <StyledDiv flexGrow={1} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                    <StyledButton onClick={()=>{closeFrame13()}} width='3.5em'　height='2em' fontSize='1.5em' fontWeight='normal'>
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
                <StyledDiv flexGrow={1} margin='0 30px 20px 0 ' alignSelf='flex-end'>
                    <StyledButton onClick={() =>{}} height='1.5em' width='5em' fontSize='2em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='4px'>
                        保存
                    </StyledButton>
                </StyledDiv>
            </FlexBox>
        </StyledDiv>
    );
} 

export default Frame13;