import React, { useState, useEffect } from 'react';
import firebase, { database } from '../firebase';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, HoverElement2, StyledSelect, AbsoluteBox} from './StyledComponents';
import CheckButton from './CheckButton';
import { Redirect } from 'react-router-dom';
import Frame15 from './Frame15';
import { OneDataType, OneTaskType, DataType } from '../Datatype';

const mockMemo = ['アルゴの課題について', '買い物リスト', 'チケットの予約', '欲しいものリスト', 'ポエム', 'ポエム2'];

/* propsを受け取らないときは、<>は必要ない。 */
const Frame10: React.FC = () => {
    const [ isOpeningFrame15, setIsOpeningFrame15 ] = useState(false);  // frame15が開いているかを管理する
    const [ tasks, setTasks ] = useState([] as DataType);   // タスクのデータが配列になって入っている。この配列データの型定義は別ファイルを参照。   
    const [ filter, setFilter ] = useState('all');  // 表示するタスクの絞り込み条件を記述する。

    /* frame15を開く関数 */
    const openFrame15 = () => {
        setIsOpeningFrame15(true);
    }

    /* frame15を閉じる関数 */
    const closeFrame15 = () => {
        setIsOpeningFrame15(false);
    }

    /* 絞り込み条件が変更されたときに呼ばれるように設定してある */
    const onChangeFilter = (value: string) => {
        setFilter(value);
    }

    /* 各タスクの削除ボタンが押されたときに動作するようにしてある */
    const deleteTask = (targetKey: string) => {
        // ユーザーのタスクデータへの参照を取得
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;
        const taskRef = database.ref('yuritani_demo/' + user.uid + '/task');

        // 現在のタスク一覧から、対象のタスクを取得
        const targetTask = tasks.find((item) => item.key === targetKey);
        if(!targetTask) return;
        // 対象のタスクへの参照を取得
        const targetTaskRef = taskRef.child('/' + targetTask.key);
        if(!targetTaskRef) return;
        // データベース上から対象のタスクを削除
        targetTaskRef.remove();
        // 一つしかないデータを削除したときは何故かuseEffectのonが呼ばれない。
        // あまり良くない方法だが変更がDBに反映されたことを前提として表示を消去する。
        if(tasks.length === 1) setTasks([]);
    }

    /* 各タスクのチェックボタンが押されたときに動作するようにしてある */
    const checkTask = (targetKey: string) => {
        // ユーザーのタスクデータへの参照を取得
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;
        const taskRef = database.ref('yuritani_demo/' + user.uid + '/task');

        // 現在のタスク一覧から、対象のタスクを取得
        const targetTask = tasks.find((item) => item.key === targetKey);
        if(!targetTask) return;
        // 対象のタスクへの参照を取得 ここまでやってることはdeleteTaskと全く同じ
        const targetTaskRef = taskRef.child('/' + targetTask.key);
        if(!targetTaskRef) return;
        // 属性を指定して更新
        targetTaskRef.update({
            "isDone": !targetTask.content.isDone,
            "updatedAt": new Date().getTime()
        });
    }

    // useEffectは、コンポーネントの再描写が行われる前後に自動的に呼び出される関数。
    // 今回は、タスクの情報が更新されるたびに呼び出されるようになってるらしい。
    // 厄介なのが、一つしかない子要素が削除されたときは呼ばれないという点。そのため今回は、51行目のような苦し紛れのごまかしをしている…
    // Firebaseの仕様がいまいちよくわからん
    useEffect(()=>{
        // ユーザーの情報を取得。それぞれnullチェックを行う。
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;
        // pathを指定して、データへの参照を取得。
        const taskRef = database.ref('yuritani_demo/' + user.uid + '/task');
        if(!taskRef) return;
        // onメソッドは、参照先のデータを取得するメソッド。
        taskRef.on('value', (snapshot) => {
            const tasks = snapshot.val();
            if(tasks === null) return;
            // entriesには、オブジェクトのキー値（自動生成されたもの）と、中身の値（オブジェクト）のペアが配列になって返ってくるようだ。
            const entries = Object.entries(tasks);
            // entriesをオブジェクトに直す
            const gainedData = entries.map((data) => {
                const [ key, task ] = data;
                return { key: key, content: task }
            })
            // stateにデータを保持
            // gainedDataは型が決まっていないので、DataTypeにキャストする。
            const gainedTasks: DataType = gainedData as DataType;
            setTasks(gainedTasks);
        })
    }, []);

    /* タスクの配列を受け取って、filterのstateに定めた条件に従って絞り込みを行う。 */
    const filterTasks = (tasks: DataType) => {

        // filteredTasks = tasks.filter((item)=> item.content.isDone === false);
        if(filter !== 'all'){
            return tasks.filter((item)=> item.content.category === filter)
        }else{
            return tasks;
        }
    };


    /* ユーザーの情報が取得できれば課題一覧を描写し、出来なければ（認証ができていないければ）サインインページに飛ばすようにしてある。 */
    /* 正直この処理はAuth.tsxで既にしているのでいらないかも */
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
                    <FlexBox    flexDirection='column'
                        alignItems='center'
                        justifyContent='space-around'>
                        <StyledDiv flexGrow={2} margin='30px 0 0 0 '>
                            <FlexBox alignItems='center'>
                                <StyledText size='1.8em' fontWeight='normal'>
                                    課題一覧
                                </StyledText>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={1} margin='0 30px 0 0 ' alignSelf='flex-end' >
                            <FlexBox>
                                <StyledDiv margin='0 30px 0 0 '>
                                    {/* ここでonChangeに関数を置き、絞り込み条件を変更したときの値を取得している。*/}
                                    <StyledSelect   value={filter}
                                                    onChange={(e)=>{ onChangeFilter(e.target.value)}}
                                                        width='200px'
                                                        fontSize='1.5em'
                                                        height='2.0em'>
                                        <option value='all'>全てのToDo</option>
                                        <option value='homework'>授業課題</option>
                                        <option value='todo'>ToDo</option>
                                    </StyledSelect>
                                </StyledDiv>
                                <StyledButton onClick={/*ここでframe15を開く処理を記述している。*/()=>{ openFrame15() }} height='1.5em' width='1.5em' fontSize='3em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='50%'>
                                    +
                                </StyledButton>
                            </FlexBox>
                        </StyledDiv>
                        <StyledDiv flexGrow={1} margin='0 0 0 60%' alignSelf='flex-start'>
                            <StyledText size='1.7em'>
                                期限
                            </StyledText>
                        </StyledDiv>
                        <StyledDiv flexGrow={20} width='95%' margin='0 0 30px 0' >
                            <FlexBox flexDirection='column' >
                                {/* filterTasks関数に全てのタスクのデータを渡して、絞り込み後の配列を取得している。 */}
                                {/* map関数を使うとその中では配列の中の各値がitemとして取得できる。各々を描写する処理をfor文のように記述できる。 */}
                                {
                                    filterTasks(tasks).map((item) => {
                                        return  <StyledDiv key={item.key} width='100%' enableShadow={true} margin='20px 20px 0 0' backgroundColor='#fefefe' borderRadius={4}>
                                                    <FlexBox justifyContent='space-around' flexDirection='row' alignItems='center' height='4.5em' >
                                                        <CheckButton onClick={/* ここにチェックボックスの処理を記述している */()=> { checkTask(item.key)}} isChecked={item.content.isDone} width='4.5rem' height='4.5rem'/>
                                                        <StyledText size='1.7em' width='45%' >
                                                            {item.content.name}
                                                        </StyledText>
                                                        <StyledText size='1.7em' width='40%'>
                                                            {item.content.deadline.slice(0, 4)} / {item.content.deadline.slice(5, 7)} / {item.content.deadline.slice(8)}
                                                        </StyledText>
                                                        <StyledButton onClick={/*ここに削除ボタンの処理を記述している。*/()=> {deleteTask(item.key)}} width='4.5em' height='4.5rem' fontSize='1.2em' fontColor='#fefefe' fontWeight='bold' backgroundColor='#ff4500' borderRadius='4px'>
                                                            削除
                                                        </StyledButton>
                                                    </FlexBox>
                                                </StyledDiv>
                                    })
                                }
                            </FlexBox>
                        </StyledDiv>
                    </FlexBox>
                    <StyledDiv noDisplay={!isOpeningFrame15}> 
                        <AbsoluteBox top='0%' left='0%'>
                            <StyledDiv width='100vw' height='100vh' backgroundColor='rgba(0, 0, 0, 0.2)'>
                                <AbsoluteBox top='0%' left='50%' translateX={-50} translateY={0}>
                                    <Frame15 closeFrame15={closeFrame15}/>
                                </AbsoluteBox>
                            </StyledDiv>
                        </AbsoluteBox>
                    </StyledDiv>
                </StyledDiv>
            )
        }else{
            return <Redirect to='/frame1'/>
        }
    }

    return (
        <>
            {/* 関数の返り値によって描写内容を変えている */}
            {render()}
        </>
    );
} 

/* 他要素からアクセスするときは必ずexportする。 */
/* 「export default」は、import先のコンポーネントで好きな名前にして使える。各ファイルにつき1つのみ指定可能。 */
/* ただの「export」は、import先のコンポーネントでは、{}で囲って、宣言元のコンポーネントと同名で使う。各ファイルでいくつでも指定可能。 */
export default Frame10;