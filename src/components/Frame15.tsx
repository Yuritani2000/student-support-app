import React, { useState, useEffect } from 'react';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, StyledSelect } from './StyledComponents';
import firebase, { taskAndTodoRef } from '../firebase';
import { TaskAndTodoType } from '../DataTypes/TaskAndTodoDataTypes';
import { OneSubjectDataType } from '../DataTypes/SubjectTypes';

/* propsの宣言部分。 */
/* 呼び出し元のコンポーネントから受け取るデータとその型を指定する。 */
/* props名: データ型; で宣言する。必須のpropsはこのように記述する。*/
/* props名?: データ型;　で宣言すると、このprops任意のpropsとすることができる。*/
type Frame15Props = {
    closeFrame15: () => void;   // frame15を閉じるための関数。
}

/* Reactコンポーネントの本体。Hooksという記法で書いている。 */
/* <>の内側に先ほどの型定義を当てはめる。()内の「props」に、実際の値が渡ってくる。 */
const Frame15: React.FC<Frame15Props> = (props) => {
    /* stateの宣言箇所 */
    /* 左が実際に参照するstate、右がstateを更新するためのメソッド */
    /* useState()の括弧内はstateの初期値。ここでstateの型も決定する。 */
    const [ subjectSelectDisabled, setSubjectSelectDisabled ] = useState(true); // 科目を選択するselect要素を無効にするか決める
    const [ category, setCategory ] = useState('default');  // 現在選択中のカテゴリ（授業課題かTodoか、未選択か）を保持する
    const [ subjectId, setSubjectId ] = useState('default');    // 現在選択中の科目を保持する
    const [ taskName, setTaskName ] = useState('');         // 現在入力されているタスクの名前を保持する
    const [ deadline, setDeadline ] = useState('');         // 現在入力されている締め切りを保持する
    const [ isSubmittable, setIsSubmittable ] = useState(false);    // 入力状態が条件を満たし、追加可能な状態かどうかを保持する
    const [ isWarning, setIsWarning ] = useState(false);    // 画面に警告（各入力欄を赤枠で示す）を表示するかを保持する

    /* 渡ってきたpropsを各変数に展開する。 */
    const { closeFrame15 } = props;

    /* モック用の科目一覧。時間割機能実装後に本物と置き換える必要あり。 */
    const mockSubjects: OneSubjectDataType[] = [
        {
            key: "dummyKey0",
            content: {
                user_id: "dummyUser",
                name: "国語",
                memo: "hogehoge",
                create_at: "2017-05-05 00:00:00.000+0000",
                update_at: "2017-05-05 00:00:00.000+0000",
            }
        },
        {
            key: "dummyKey1",
            content: {
                user_id: "dummyUser",
                name: "数学",
                memo: "hogehoge",
                create_at: "2017-05-05 00:00:00.000+0000",
                update_at: "2017-05-05 00:00:00.000+0000",
            }
        },
        {
            key: "dummyKey2",
            content: {
                user_id: "dummyUser",
                name: "社会",
                memo: "hogehoge",
                create_at: "2017-05-05 00:00:00.000+0000",
                update_at: "2017-05-05 00:00:00.000+0000",
            }
        },
        {
            key: "dummyKey3",
            content: {
                user_id: "dummyUser",
                name: "理科",
                memo: "hogehoge",
                create_at: "2017-05-05 00:00:00.000+0000",
                update_at: "2017-05-05 00:00:00.000+0000",
            }
        },
        {
            key: "dummyKey4",
            content: {
                user_id: "dummyUser",
                name: "英語",
                memo: "hogehoge",
                create_at: "2017-05-05 00:00:00.000+0000",
                update_at: "2017-05-05 00:00:00.000+0000",
            }
        },
    ]

    /* カテゴリを変更するselectの入力値が変更されたときに呼ばれる */
    const onChangeCategory = (value: string) => {
        if(value === 'task'){
            setSubjectSelectDisabled(false);
        }else{
            setSubjectSelectDisabled(true);
            setSubjectId('default');
        }
        console.log('category selected: ' + value);
        setCategory(value);
    }

    /* 科目を変更するselectの入力値が変更されたときに呼ばれる */
    const onChangeSubject = (value: string) => {
        setSubjectId(value);
    }

    /* タスク内容の入力値が変更されたときに呼ばれる */
    const onChangeTaskName = (value: string) => {
        setTaskName(value);
    }

    /* 締め切りの入力値が変更されると呼ばれる */
    const onChangeDeadline = (value: string) => {
        setDeadline(value);
    }

    /* 入力値が条件を満たしているか確かめる。 */
    const checkSubmittable = () => {
        console.log('check if submittable')
        if(category === 'default' || taskName === '' || deadline === ''){
            console.log('some forms are empty');
            setIsSubmittable(false);
        }else if(category === 'task' &&　subjectId === 'default') {
            console.log('you must select any subject when task is selected')
            setIsSubmittable(false);
        }else {
            console.log('now you can submit your task!')
            setIsSubmittable(true);
        }
    }
    
    /* 「追加」ボタンをクリックすると呼ばれる。 */
    const onSubmit = () => {
        if(!isSubmittable){ // 入力が条件を満たさない場合
            setIsWarning(true);
        }else{// 入力が条件を満たす場合
            push();
            closeFrame15();
            setCategory('default');
            setSubjectId('default');
            setTaskName('');
            setDeadline('');
            setIsWarning(false);
        }
    }

    /* Firebaseに実際にタスクデータを送信する。 */
    const push = () => {
        const now = new Date(); // タイムスタンプ用のdateオブジェクト
        const currentTimeStamp = now.getTime(); // 1970年からの現在の時刻を、ミリ秒単位で取得する。
        const user = firebase.auth().currentUser;   // 現在ログインしているユーザーを取得する。
        if(!user){/* nullチェック */ return; }
        const userId = user.uid;// ユーザーIDの取得
        if(!userId){/* nullチェック */ return; }
        console.log('post task as: ' + userId);
        const listRef = taskAndTodoRef.child(userId);
        const newObject: TaskAndTodoType = {
            subject_id: subjectId,
            title: taskName,
            deadline: deadline,
            create_at: now.toString(),
            update_at: now.toString(),
        }
        if(!listRef) return;
        listRef.push(newObject);
    }
    
    /* useEffectは、コンポーネントの再描写の前後に呼ばれる関数。 */
    /* 今回は、第2引数に指定したstateが変化するたびに呼ばれる。 */
    useEffect(checkSubmittable, [category, subjectId, taskName, deadline]);

    /* 実際に画面に描写するJSXを記述する */
    /* StyledComponentsにpropsを渡すことで、柔軟にデザインを変更することができる。 */
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
                    {/* このボタン要素のonClickに、クリック時の動作を記述する。 */}
                    <StyledButton onClick={()=>{setIsWarning(false);closeFrame15()}} width='3.5em'　height='2em' fontSize='1.5em' fontWeight='normal'>
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
                            {/* このselect要素のonChangeに、状態変化時の動作を記述する。 */}
                            <StyledSelect   value={category}
                                            onChange={(e)=> onChangeCategory(e.target.value)}
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'
                                            borderColor={(isWarning && (category==='default')) ? '#ff0000' : ''}>
                                <option value='default'>カテゴリーを選択</option>
                                <option value='task'>授業課題</option>
                                <option value='todo'>ToDo</option>
                            </StyledSelect>
                        </FlexBox>
                        <FlexBox alignItems='center'>
                            <StyledText width='8em' size='1.5em'>科目名</StyledText>
                            {/* このselect要素のonChangeに、状態変化時の動作を記述する。 */}
                            <StyledSelect   value={subjectId}
                                            onChange={(e)=> onChangeSubject(e.target.value)}
                                            disabled={subjectSelectDisabled}
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'
                                            borderColor={(isWarning && subjectId ==='default') ? '#ff0000' : ''}>
                                <option value='default'>科目を選択</option>
                                {
                                    mockSubjects.map((item) => {
                                        return <option value={item.key}>{item.content.name}</option>
                                    })
                                }
                            </StyledSelect>
                        </FlexBox>
                        <FlexBox alignItems='center'>
                            <StyledText width='8em' size='1.5em'>内容</StyledText>
                            {/* このinput要素のonChangeに、状態変化時の動作を記述する。 */}
                            <StyledInput    value={taskName}
                                            onChange={(e) => {onChangeTaskName(e.target.value)}}
                                            type='text'
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'
                                            placeholder='内容を入力'
                                            borderColor={(isWarning && (taskName==='')) ? '#ff0000' : ''}/>
                        </FlexBox>
                        <FlexBox alignItems='center'>
                            <StyledText width='8em' size='1.5em'>期限</StyledText>
                            {/* このinput要素のonChangeに、状態変化時の動作を記述する。 */}
                            <StyledInput    value={deadline}
                                            onChange={(e) => {onChangeDeadline(e.target.value)}}
                                            type='date'
                                            width='100%'
                                            fontSize='1.5em'
                                            height='2.0em'
                                            placeholder='期限'
                                            borderColor={(isWarning && (deadline==='')) ? '#ff0000' : ''}/>
                        </FlexBox>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={2} width='50%' margin ='20px 0 0 0 '>
                    {/* このボタン要素のonClickに、クリック時の動作を記述する。 */}
                    <StyledButton onClick={()=>{onSubmit()}} width='100%' height='2.0em' backgroundColor={isSubmittable ? '#87cefa' : '' } fontColor={isSubmittable ? '#000000' : '#fefefe'} fontSize='1.5em' fontWeight='bold'  >
                        追加
                    </StyledButton>
                </StyledDiv>
            </FlexBox>
        </StyledDiv>
    );
}

export default Frame15;