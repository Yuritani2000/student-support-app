export type MemoDataType = {
    id: string;
    content: MemoType;
}

export type MemoType = {
    user_id: string;
    title: string;
    content: string;
    create__at: string;
    update_at: string;
}