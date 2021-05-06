/* TypeScriptでオブジェクトを定義するときには、このようにオブジェクト内の値の型を定義する。 */
export type OneTodoDataType = {
    key: string;
    content: OneTodoType;
}

export type OneTodoType = {
    user_id: string;
    title: string;
    deadline: string;
    create_at: string;
    update_at: string;
}