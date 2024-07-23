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

export type OptionType = {
    value: ScheduleTypes;
    label: string;
};

export const scheduleTypeOptions = [
    {
        value: ScheduleTypes.Today,
        label: ScheduleTypes.Today,
    },
    {
        value: ScheduleTypes.Tomorrow,
        label: ScheduleTypes.Tomorrow,
    },
    {
        value: ScheduleTypes.ThisWeek,
        label: ScheduleTypes.ThisWeek,
    },
];
