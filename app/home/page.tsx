import { ScheduledTaskContainers } from "@/components/container/scheduled-task-containers-props";
import { ScheduleTypes, Task } from "@prisma/client";

// const expTaskItems: TaskItem[] = [];

const HomePage = () => {
    return (
        <div className="w-full h-full overflow-hidden">
            <ScheduledTaskContainers></ScheduledTaskContainers>
        </div>
    );
};

export default HomePage;
