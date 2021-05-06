/* TypeScriptでオブジェクトを定義するときには、このようにオブジェクト内の値の型を定義する。 */

export type DataType = OneTaskDataType[];

export type OneTaskDataType = {
    key: string;
    content: OneTaskType;
}

export type OneTaskType = {
    subject_id: string;
    user_id: string;
    title: string;
    deadline: string;
    create_at: string;
    update_at: string;
}