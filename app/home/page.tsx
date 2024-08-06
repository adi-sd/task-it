import { NavBar } from "@/components/commons/navbar";
import { ScheduledTaskContainers } from "@/components/container/scheduled-task-containers";

// const expTaskItems: TaskItem[] = [];

const HomePage = () => {
    return (
        <div className="w-full h-full overflow-hidden">
            <NavBar className="w-full h-[60px]"></NavBar>
            <ScheduledTaskContainers className="w-full h-[calc(100vh-60px)]"></ScheduledTaskContainers>
        </div>
    );
};

export default HomePage;
