/* TypeScriptでオブジェクトを定義するときには、このようにオブジェクト内の値の型を定義する。 */

export type TaskAndTodoDataType = {
    id: string;
    content: TaskAndTodoType;
}

export type TaskAndTodoType = {
    subject_id: string;
    title: string;
    deadline: string;
    create_at: string;
    update_at: string;
}