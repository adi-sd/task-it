export enum ScheduleTypes {
    Today = "Today",
    Tomorrow = "Tomorrow",
    ThisWeek = "This Week",
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

export type ComboBoxOption = {
    value: ScheduleTypes;
    label: string;
};
