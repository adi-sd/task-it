export enum ScheduleTypes {
    "Today",
    "Tomorrow",
    "This-Week",
}

export type TaskItem = {
    id: string;
    headline: string;
    description: string;
    isCompleted: boolean;
    schedule: ScheduleTypes;
    timestamps: {
        createdAt: Date;
        lastModifiedAt: Date;
    };
};
