export type TasksType = OneTaskType[];

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