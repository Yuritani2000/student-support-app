import React, { useState, useEffect} from 'react';
import { FlexBox, StyledDiv, StyledButton, StyledText, StyledInput, HoverElement2, StyledSelect, AbsoluteBox, FixedBox, StyledTextArea} from './StyledComponents';
import CheckButton from './CheckButton';
import firebase, { database } from '../firebase';
import { OneSubjectDataType } from '../DataTypes/SubjectTypes';
import { TimetableDataType } from '../DataTypes/TimetableDataTypes';
import { TaskAndTodoDataType } from '../DataTypes/TaskAndTodoDataTypes';
import Frame15 from './Frame15';
const mockHomework = ['教科書演習問題1', 'アドバンスプラスp.22-p.24']

const mockMemo = ['アルゴの課題について', '買い物リスト', 'チケットの予約', '欲しいものリスト', 'ポエム', 'ポエム2'];

type Frame14Props = {
    closeFrame14: () => void;
    selectedSubject?: string;
    isOpeningFrame14: boolean;
}

const Frame14: React.FC<Frame14Props> = (props) => {

    const { closeFrame14, selectedSubject='', isOpeningFrame14} = props;
    const [ subjects, setSubjects ] = useState({} as OneSubjectDataType);
    const [ tasks, setTasks ] = useState([] as TaskAndTodoDataType[]);
    const [subjectMemo, setSubjectMemo] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [isOpeningFrame15, setIsOpeningFrame15] = useState(false);
    const [timetables, setTimetables] = useState([] as TimetableDataType[])
    const taskAndTodoRef = database.ref('task_and_todo');
    const subjectRef = database.ref('subject');
    const timetableRef = database.ref('timetable');

    const openFrame15 = () =>{
        setIsOpeningFrame15(true);
    }

    const closeFrame15 = () =>{
        setIsOpeningFrame15(false);
    }
   /* let loc = location.origin;
    document.querySelector('.location')
        .innerHTML = loc;
        */
    useEffect(()=>{
        console.log("Effect");
        // ユーザーの情報を取得。それぞれnullチェックを行う。
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;

        const listRef = taskAndTodoRef.child(userId);
        if(!listRef) return;
        // onメソッドは、参照先のデータを取得するメソッド。
        listRef.on('value', (snapshot) => {
            const tasks = snapshot.val();
            if(tasks === null) return;
            // entriesには、オブジェクトのキー値（自動生成されたもの）と、中身の値（オブジェクト）のペアが配列になって返ってくるようだ。
            const entries = Object.entries(tasks);
            // entriesをオブジェクトに直す
            const gainedData = entries.map((data) => {
                const [ id, task ] = data;
                return { id: id, content: task }
            })
            const gainedTasks: TaskAndTodoDataType[] = gainedData as TaskAndTodoDataType[];
            const filteredTasks = gainedTasks.filter((item) => item.content.subject_id === selectedSubject);
            if(!filteredTasks){
                return;
            }
            setTasks(filteredTasks);
        })
        const listRef2 = subjectRef.child(userId);
        if(!listRef2) return;
        // onメソッドは、参照先のデータを取得するメソッド。
        listRef2.on('value', (snapshot) => {
            const subjects = snapshot.val();
            if(subjects === null) return;
            // entriesには、オブジェクトのキー値（自動生成されたもの）と、中身の値（オブジェクト）のペアが配列になって返ってくるようだ。
            const entries = Object.entries(subjects);
            // entriesをオブジェクトに直す
            const gainedData2 = entries.map((data) => {
                const [ id, subject ] = data;
                return { id: id, content: subject }
            })
            // stateにデータを保持
            // gainedDataは型が決まっていないので、DataTypeにキャストする。
            const gainedSubjects: OneSubjectDataType[] = gainedData2 as OneSubjectDataType[];
            const filteredSubjects = gainedSubjects.find((item) => item.id === selectedSubject);
            if(!filteredSubjects){
                return;
            }
            setSubjectName(filteredSubjects.content.name);
            setSubjectMemo(filteredSubjects.content.memo);
        })
        const listRef3 = timetableRef.child(userId);
        listRef3.on('value', (snapshot) => {
            const timetables = snapshot.val();
            if(timetables === null) return;
            // entriesには、オブジェクトのキー値（自動生成されたもの）と、中身の値（オブジェクト）のペアが配列になって返ってくるようだ。
            const entries = Object.entries(timetables);
            // entriesをオブジェクトに直す
            const gainedData = entries.map((data) => {
                const [ id, timetable ] = data;
                return { id: id, content: timetable }
            })
            const gainedTimetables: TimetableDataType[] = gainedData as TimetableDataType[];
            const filteredTimetables = gainedTimetables.filter((item) => item.content.subject_id === selectedSubject);
            if(!filteredTimetables){
                return;
            }
            setTimetables(filteredTimetables);
        })
    }, [isOpeningFrame14]);

  const onChangesetSubjectMemo = (value: string) => {
        setSubjectMemo(value);
    }

    
  const onSubmit = () => {
    push();
  }

  const push = () => {
    const now = new Date(); // タイムスタンプ用のdateオブジェクト
    const currentTimeStamp = now.getTime(); // 1970年からの現在の時刻を、ミリ秒単位で取得する。
    const user = firebase.auth().currentUser;   // 現在ログインしているユーザーを取得する。
    if(!user){/* nullチェック */ return; }
    const userId = user.uid;// ユーザーIDの取得
    if(!userId){/* nullチェック */ return; }
    console.log('post todo as: ' + userId);
    const listRef = subjectRef.child(userId);
        if(!listRef) {
            return;
        }
        const targetSubjectMemoRef = listRef.child(selectedSubject);
        targetSubjectMemoRef.update({
            "memo": subjectMemo,
          });
    }

    const deleteTask = (targetId: string) => {
        // ユーザーのタスクデータへの参照を取得
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;

        // 現在のタスク一覧から、対象のタスクを取得
        const targetTask = tasks.find((item) => item.id === targetId);
        if(!targetTask) return;
        // 対象のタスクへの参照を取得
        const listRef = taskAndTodoRef.child(userId);
        const targetRef = listRef.child('/' + targetTask.id);
        if(!targetRef) return;
        // データベース上から対象のタスクを削除
        targetRef.remove();
        // 一つしかないデータを削除したときは何故かuseEffectのonが呼ばれない。
        // あまり良くない方法だが変更がDBに反映されたことを前提として表示を消去する。
        if(tasks.length === 1) setTasks([]);
    }

    const deleteSubject = (targetId: string) => {
        const user = firebase.auth().currentUser;
        if(!user) return;
        const userId = user.uid;
        if(!userId) return;
  
        const listRef = subjectRef.child(userId);
        const SubjectRef = listRef.child('/' + targetId);
        if(!SubjectRef) return;
        SubjectRef.remove();
        pushDelete(selectedSubject);
        closeFrame14();
    }

    const pushDelete = (targetId: string) => {
        const now = new Date(); // タイムスタンプ用のdateオブジェクト
        const currentTimeStamp = now.getTime(); // 1970年からの現在の時刻を、ミリ秒単位で取得する。
        const user = firebase.auth().currentUser;   // 現在ログインしているユーザーを取得する。
        if(!user){/* nullチェック */ return; }
        const userId = user.uid;// ユーザーIDの取得
        if(!userId){/* nullチェック */ return; }
        console.log('post todo as: ' + userId);
        const listRef = taskAndTodoRef.child(userId);
        if(!listRef) {
            return;
        }
        tasks.map((item) =>{
            const taegetTaskRef = listRef.child(item.id);
            if(!taegetTaskRef){
                return;
            }
            taegetTaskRef.update({
                "subject_id": 'default',
              });
        })
    }

    const deleteCourseCancellation = () =>{
        const user = firebase.auth().currentUser;   // 現在ログインしているユーザーを取得する。
        if(!user){/* nullチェック */ return; }
        const userId = user.uid;// ユーザーIDの取得
        if(!userId){/* nullチェック */ return; }
        console.log('post todo as: ' + userId);
        const listRef = timetableRef.child(userId);
            if(!listRef) {
                return;
            }
            timetables.map((item) =>{
                const targetDeleteTimetableRef = listRef.child(item.id);
                if(!targetDeleteTimetableRef){
                    return;
                }
                targetDeleteTimetableRef.remove();
                window.location.reload();
            })
    }
    
    return (
        <StyledDiv  margin='0% auto 0 auto'
        width='min( calc(683px + (100vw - 683px)*0.4 ), 100vw )'
        height='auto'
        backgroundColor='transparent'
        enableShadow={false}
        borderRadius={4}>
            <FlexBox    flexDirection='column'
                alignItems='center'
                justifyContent='space-around'>
                <StyledDiv flexGrow={1} height='3em' margin='20px 0 0 20px ' alignSelf='flex-start'>
                    <StyledButton  onClick={()=>{closeFrame14()}}width='3.5em'　height='2em' fontSize='1.5em' fontWeight='normal'>
                        戻る
                    </StyledButton>
                    <StyledButton onClick={() =>{deleteCourseCancellation()}} width='11rem' height='4.5rem' fontSize='1.2em' fontColor='#fefefe' fontWeight='bold' backgroundColor='#ff4500' borderRadius='4px'>
                        この科目の全ての履修状態を削除
                    </StyledButton>
                </StyledDiv>
                <StyledDiv flexGrow={2} margin='30px 0 0 0 '>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            {subjectName}
                        </StyledText>
                        <StyledButton onClick={() =>{deleteSubject(selectedSubject)}} width='4.5rem' height='4.5rem' fontSize='1.2em' fontColor='#fefefe' fontWeight='bold' backgroundColor='#ff4500' borderRadius='4px'>
                        科目を削除
                    </StyledButton>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={2} margin='30px 0 0 0 ' alignSelf='flex-start'>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            課題一覧
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={1} margin='0 30px 0 0 ' alignSelf='flex-end' >
                    <FlexBox>
                        <StyledButton onClick={()=>openFrame15()} height='1.5em' width='1.5em' fontSize='3em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='50%'>
                            +
                        </StyledButton>
                    </FlexBox>
                </StyledDiv>
                <FlexBox justifyContent='space-around'>
                    <StyledDiv flexGrow={1} width='5em'　margin='0 0 0 20%' alignSelf='flex-start'>
                        <StyledText size='1.7em'>
                            課題名
                        </StyledText>
                    </StyledDiv>
                    <StyledDiv flexGrow={1} width='5em' margin='0 0 0 10%' alignSelf='flex-start'>
                        <StyledText size='1.7em'>
                            期限
                        </StyledText>
                    </StyledDiv>
                </FlexBox>
                <StyledDiv flexGrow={20} width='95%' margin='0 0 30px 0' >
                    <FlexBox flexDirection='column' >
                        {
                            tasks.map((item) => {
                                return  <StyledDiv width='100%' enableShadow={true} margin='20px 20px 0 0' isClickable={true} backgroundColor='#fefefe' borderRadius={4}>
                                            <FlexBox justifyContent='space-between' flexDirection='row' alignItems='center' height='4.5em' >
                                                <StyledDiv margin=' 0 0 0 10px' width='45%'>
                                                <StyledText size='1.7em' isClickable={true} >
                                                    {item.content.title}
                                                </StyledText>
                                                </StyledDiv>
                                                <StyledText size='1.7em' isClickable={true} width='40%'>
                                                    {item.content.deadline}
                                                </StyledText>
                                                <StyledButton onClick={()=> {deleteTask(item.id)}}width='4.5rem' height='4.5rem' fontSize='1.2em' fontColor='#fefefe' fontWeight='bold' backgroundColor='#ff4500' borderRadius='4px'>
                                                    削除
                                                </StyledButton>
                                            </FlexBox>
                                        </StyledDiv>
                            })
                        }
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={1} margin='30px 0 0 0 ' alignSelf='flex-start'>
                    <FlexBox alignItems='center'>
                        <StyledText size='1.8em' fontWeight='normal'>
                            メモ帳
                        </StyledText>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={20} width='95%' margin='0 0 30px 0' >
                    <FlexBox flexDirection='column' >
                        <StyledTextArea value={ (!subjectMemo) ? '' : subjectMemo}
                                    onChange={(e)=>onChangesetSubjectMemo(e.target.value)}
                                    id='textArea'
                                    fontSize='2em'
                                    height='10cm'
                                    width='100%'
                                    placeholder='メモ欄'
                                    resize='vertical'
                                    minWidth='100%'
                                    minHeight='10cm'/>
                    </FlexBox>
                </StyledDiv>
                <StyledDiv flexGrow={1} margin='0 30px 0 0 ' alignSelf='flex-end'>
                    <StyledButton onClick={() =>{onSubmit()}} height='1.5em' width='5em' fontSize='2em' fontWeight='normal' backgroundColor='#87cefa' borderRadius='4px'>
                        保存
                    </StyledButton>
                </StyledDiv>
            </FlexBox>
            <StyledDiv noDisplay={!isOpeningFrame15}> 
                        <AbsoluteBox top='0%' left='-23%'>
                            <StyledDiv width='100vw' height='100vh' backgroundColor='rgba(0, 0, 0, 0.2)'>
                                <AbsoluteBox top='0%' left='50%' translateX={-50} translateY={0}>
                                    <Frame15 closeFrame15={closeFrame15}/>
                                </AbsoluteBox>
                            </StyledDiv>
                        </AbsoluteBox>
                    </StyledDiv>
        </StyledDiv>
    );
} 

export default Frame14;