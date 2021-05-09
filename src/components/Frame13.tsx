import React, { useState, useEffect } from 'react';
//import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, StyledTextArea } from './StyledComponents';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, StyledTextArea, HoverElement2, StyledSelect, AbsoluteBox,FixedBox} from './StyledComponents';
import firebase, { database } from '../firebase';
import { MemoType } from '../DataTypes/MemoDataTypes';
import { MemoDataType } from '../DataTypes/MemoDataTypes';


type Frame13Props = {
    closeFrame13: () => void;   // frame15を閉じるための関数。
    selectedMemo?: string; //選択肢したメモのidを渡す変数
    isOpeningFrame13:boolean;
}

const Frame13: React.FC<Frame13Props> = (props) => {

    const { closeFrame13, selectedMemo='', isOpeningFrame13} = props;
    const memoRef = database.ref('memo');
    const [ title, setTitle ] = useState('');
    const [ contents, setContents ] = useState('');
    const [ memos, setMemos ] = useState([] as MemoDataType[]);

    const onChangeTitle = (value: string) => {
        setTitle(value);
    }

    const onChangeContents = (value: string) => {
        setContents(value);
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
            console.log(gainedMemos);
        })
    }, [isOpeningFrame13]);

    useEffect(()=>{
        const foundMemo = memos.find((item) =>  item.id===selectedMemo);
        if(!foundMemo){
            setTitle('');
            setContents('');
        }else{
            if(!foundMemo.content.title){
                setTitle('');
            }else{
                setTitle(foundMemo.content.title)
            }
            if(!foundMemo.content.contents){
                setContents('')
            }else{
                setContents(foundMemo.content.contents)
            }
    }
    }, [memos])


  const onSubmit = () => {
        push();
        closeFrame13();
        setTitle('');
        setContents('');
    }
 
    const push = () => {
        const now = new Date(); // タイムスタンプ用のdateオブジェクト
        const currentTimeStamp = now.getTime(); // 1970年からの現在の時刻を、ミリ秒単位で取得する。
        const user = firebase.auth().currentUser;   // 現在ログインしているユーザーを取得する。
        if(!user){/* nullチェック */ return; }
        const userId = user.uid;// ユーザーIDの取得
        if(!userId){/* nullチェック */ return; }
        console.log('post todo as: ' + userId);
        const listRef = memoRef.child(userId);
        if(selectedMemo===''){
            const newObject: MemoType = {
                title: (title==='') ? '無題のメモ' : title,
                contents: contents,
                create_at: now.toString(), 
                update_at: now.toString(),
            }
            if(!listRef) return;
            listRef.push(newObject);
        }else{
            const targetMemoRef = listRef.child(selectedMemo);
            targetMemoRef.update({
                "title": title,
                "contents": contents,
                "update_at": now.toString(),
              });
        }
        
    }


    return (
        <StyledDiv  margin='5% auto 0 auto'
        width='min( calc(683px + (100vw - 683px)*0.4 ), 100vw )'
        height='auto'
        backgroundColor='#FFFFFF'
        enableShadow={true}
        borderRadius={4}>
            <FlexBox    flexDirection='column'
                alignItems='center'
                justifyContent='space-around'>
                <StyledDiv flexGrow={1} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                    <StyledButton onClick={()=>{closeFrame13();setTitle('');setContents('');}} width='3.5em'　height='2em' fontSize='1.5em' fontWeight='normal'>
                        戻る
                    </StyledButton>
                </StyledDiv>
                <StyledDiv flexGrow={2} margin='30px 0 0 0 '>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            メモを{(selectedMemo === '' ) ? '追加' : '編集'}
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={20} width='95%' margin='20px 0 30px 0' >
                    <StyledInput    value={title}
                                    onChange={(e)=>onChangeTitle(e.target.value)}
                                    fontSize='1.5em'
                                    height='2em'
                                    width='100%'
                                    placeholder='題名'/>
                </StyledDiv>
                <StyledDiv flexGrow={20} width='95%' margin='20px 0 30px 0' >
                    <StyledTextArea value={contents}
                                    onChange={(e)=>onChangeContents(e.target.value)}
                                    id='textArea'
                                    fontSize='2em'
                                    height='10cm'
                                    width='100%'
                                    placeholder='メモ欄'
                                    resize='vertical'
                                    minWidth='100%'
                                    minHeight='10cm'/>
                </StyledDiv>
                <StyledDiv flexGrow={1} margin='0 30px 20px 0 ' alignSelf='flex-end'>
                    <StyledButton onClick={() =>{onSubmit()}} height='1.5em' width='5em' fontSize='2em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='4px'>
                        保存
                    </StyledButton>
                </StyledDiv>
            </FlexBox>
        </StyledDiv>
    );
} 

export default Frame13;