import React, { useState, useEffect } from 'react';
import firebase, { database } from '../firebase';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, HoverElement2, StyledSelect, AbsoluteBox} from './StyledComponents';
import CheckButton from './CheckButton';
import { Redirect } from 'react-router-dom';
import Frame15 from './Frame15';
import { OneDataType, OneTaskType, DataType } from '../Datatype';

const mockMemo = ['アルゴの課題について', '買い物リスト', 'チケットの予約', '欲しいものリスト', 'ポエム', 'ポエム2'];

const Frame10: React.FC = () => {
    const [ isOpeningFrame15, setIsOpeningFrame15 ] = useState(false);
    const [ tasks, setTasks ] = useState([] as DataType);
    const [ filter, setFilter ] = useState('all');

    const openFrame15 = () => {
        setIsOpeningFrame15(true);
    }

    const closeFrame15 = () => {
        setIsOpeningFrame15(false);
    }

    const onChangeFilter = (value: string) => {
        setFilter(value);
    }

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
    // 厄介なのが、一つしかない子要素が削除されたときは呼ばれないという点…
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
            // entriesには、オブジェクトのキー値（自動生成されたもの）と、中身の値（連想配列）のペアが配列になって返ってくるようだ。
            const entries = Object.entries(tasks);
            // entriesを連想配列に直す
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

    const filterTasks = (tasks: DataType) => {

        // filteredTasks = tasks.filter((item)=> item.content.isDone === false);
        if(filter !== 'all'){
            return tasks.filter((item)=> item.content.category === filter)
        }else{
            return tasks;
        }
    };

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
                                <StyledButton onClick={()=>{ openFrame15() }} height='1.5em' width='1.5em' fontSize='3em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='50%'>
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
                                {
                                    filterTasks(tasks).map((item) => {
                                        return  <StyledDiv key={item.key} width='100%' enableShadow={true} margin='20px 20px 0 0' backgroundColor='#fefefe' borderRadius={4}>
                                                    <FlexBox justifyContent='space-around' flexDirection='row' alignItems='center' height='4.5em' >
                                                        <CheckButton onClick={()=> { checkTask(item.key)}} isChecked={item.content.isDone} width='4.5rem' height='4.5rem'/>
                                                        <StyledText size='1.7em' width='45%' >
                                                            {item.content.name}
                                                        </StyledText>
                                                        <StyledText size='1.7em' width='40%'>
                                                            {item.content.deadline.slice(0, 4)} / {item.content.deadline.slice(5, 7)} / {item.content.deadline.slice(8)}
                                                        </StyledText>
                                                        <StyledButton onClick={()=> {deleteTask(item.key)}} width='4.5em' height='4.5rem' fontSize='1.2em' fontColor='#fefefe' fontWeight='bold' backgroundColor='#ff4500' borderRadius='4px'>
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
            {render()}
        </>
    );
} 

export default Frame10;