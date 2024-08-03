import { ScheduledTaskContainers } from "@/components/container/scheduled-task-containers-props";
import { ScheduleTypes, Task } from "@prisma/client";

// const expTaskItems: TaskItem[] = [];

const HomePage = () => {
    return (
        <div className="">
            <ScheduledTaskContainers></ScheduledTaskContainers>
        </div>
    );
};

export default HomePage;
