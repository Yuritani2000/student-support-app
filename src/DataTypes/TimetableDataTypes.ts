export type TimetableDataType = {
    id: string;
    content: TimetableType;
}

export type TimetableType = {
    create_at: string;
    day_of_week: number;
    period: number;
    subject_id: string;
    update_at: string;
}