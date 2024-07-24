import { ScheduleTypes, TaskItem } from "@/lib/types";
import { ScheduledTaskContainers } from "@/components/container/scheduled-task-containers-props";
import { Task } from "@/components/task/task";

const expTaskItems: TaskItem[] = [
    {
        id: "xyz123",
        headline: "This is a test task 1",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore officia ullam possimus modi sint aut earum odit autem veniam in facere accusamus harum.",
        schedule: ScheduleTypes.Today, // Replace "today" with a valid value from ScheduleTypes
        isCompleted: false,
        timestamps: {
            createdAt: new Date(),
            lastModifiedAt: new Date(),
        },
    },
    {
        id: "xyz124",
        headline: "This is a test task 3",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore officia ullam possimus modi sint aut earum odit autem veniam in facere accusamus harum.",
        schedule: ScheduleTypes.Today, // Replace "today" with a valid value from ScheduleTypes
        isCompleted: false,
        timestamps: {
            createdAt: new Date(),
            lastModifiedAt: new Date(),
        },
    },
    {
        id: "xyz125",
        headline: "This is a test task 2",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore officia ullam possimus modi sint aut earum odit autem veniam in facere accusamus harum.",
        schedule: ScheduleTypes.Tomorrow, // Replace "today" with a valid value from ScheduleTypes
        isCompleted: false,
        timestamps: {
            createdAt: new Date(),
            lastModifiedAt: new Date(),
        },
    },
    {
        id: "xyz126",
        headline: "This is a test task 4",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore officia ullam possimus modi sint aut earum odit autem veniam in facere accusamus harum.",
        schedule: ScheduleTypes.Tomorrow, // Replace "today" with a valid value from ScheduleTypes
        isCompleted: false,
        timestamps: {
            createdAt: new Date(),
            lastModifiedAt: new Date(),
        },
    },
];

// const expTaskItems: TaskItem[] = [];

const HomePage = () => {
    return (
        <div className="">
            <ScheduledTaskContainers tasks={expTaskItems}></ScheduledTaskContainers>
        </div>
    );
};

export default HomePage;
