/* TypeScriptでオブジェクトを定義するときには、このようにオブジェクト内の値の型を定義する。 */

export type DataType = OneDataType[];

export type OneDataType = {
    key: string;
    content: OneTaskType;
}

export type OneTaskType = {
    category: string;
    subject: string;
    name: string;
    deadline: string;
    isDone: boolean;
    createdAt: number;
    updatedAt: number;
}