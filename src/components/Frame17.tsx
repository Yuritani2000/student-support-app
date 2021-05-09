import React, { useState } from 'react';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, StyledTextArea } from './StyledComponents';
import firebase, { database } from '../firebase';
import { CalendarMemoType } from '../DataTypes/CalendarMemoTypes'

const mockMemo = ['アルゴの課題について', '買い物リスト', 'チケットの予約', '欲しいものリスト', 'ポエム', 'ポエム2'];

type Frame17Props = {
    closingFrame17: () => void;
    stringDay: string;
}

const calendarRef = database.ref('calendar');

const Frame17: React.FC<Frame17Props> = (props) => {

    const { closingFrame17, stringDay } = props;

    const [calendarMemoTitle, setCalendarMemoTitle] = useState('');
    const [calendarMemoContents, setCalendarMemoContents] = useState('');

    const onChangeTitle = (value: string) => {
        setCalendarMemoTitle(value);
    }

    const onChangeContents = (value: string) => {
        setCalendarMemoContents(value);
    }

    const onSubmit = () => {
        push();
        closingFrame17();
        setCalendarMemoTitle('');
        setCalendarMemoContents('');
    }


    const push = () => {
        const now = new Date(); // タイムスタンプ用のdateオブジェクト
        const currentTimeStamp = now.getTime(); // 1970年からの現在の時刻を、ミリ秒単位で取得する。
        const user = firebase.auth().currentUser;   // 現在ログインしているユーザーを取得する。
        if (!user) {/* nullチェック */ return; }
        const userId = user.uid;// ユーザーIDの取得
        if (!userId) {/* nullチェック */ return; }
        console.log('post task as: ' + userId);
        const StringDay = stringDay;
        if (!StringDay) { return; }
        const listRef = calendarRef.child(userId).child(StringDay);
        const newObject: CalendarMemoType = {
            title: calendarMemoTitle,
            contents: calendarMemoContents,
            create_at: now.toString(),
            update_at: now.toString(),
        }
        if (!listRef) return;
        listRef.push(newObject);
    }

    return (
        <StyledDiv margin='5% auto 0 auto'
            width='min( calc(683px + (100vw - 683px)*0.4 ), 100vw )'
            height='auto'
            backgroundColor='transparent'
            enableShadow={false}
            borderRadius={4}>
            <FlexBox flexDirection='column'
                alignItems='center'
                justifyContent='space-around'>
                <StyledDiv flexGrow={1} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                    <StyledButton onClick={() => closingFrame17()} width='3.5em' height='2em' fontSize='1.5em' fontWeight='normal'>
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
                    <StyledInput onChange={(e) => { onChangeTitle(e.target.value) }}
                        fontSize='1.5em'
                        height='2em'
                        width='100%'
                        placeholder='題名' />
                </StyledDiv>
                <StyledDiv flexGrow={20} width='95%' margin='20px 0 30px 0' >
                    <StyledTextArea onChange={(e) => { onChangeContents(e.target.value) }}
                        id='textArea'
                        fontSize='2em'
                        height='10cm'
                        width='100%'
                        placeholder='メモ欄'
                        resize='vertical'
                        minWidth='100%'
                        minHeight='10cm' />
                </StyledDiv>
                <StyledDiv flexGrow={1} margin='0 30px 0 0 ' alignSelf='flex-end'>
                    <StyledButton onClick={()=>{onSubmit()}} height='1.5em' width='5em' fontSize='2em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='4px'>
                        保存
                    </StyledButton>
                </StyledDiv>
            </FlexBox>
        </StyledDiv>
    );
}

export default Frame17;