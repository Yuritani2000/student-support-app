export type CalendarMemoDataType = {
    id: string;
    content: CalendarMemoType;
}

export type CalendarMemoType = {
    title: string;
    contents: string;
    date: string;
    create_at: string;
    update_at: string;
}