import { auth } from "@/auth/auth";
import { FaPlus } from "react-icons/fa";

import { NavBar } from "@/components/commons/navbar";
import { ScheduledTaskContainers } from "@/components/container/scheduled-task-containers";
import { Button } from "@/components/ui/button";
import { TaskDialog } from "@/components/task/task-dialog";

const HomePage = async () => {
    const session = await auth();

    return (
        <main className="w-full h-full md:overflow-hidden overflow-y-scroll">
            <NavBar className="fixed md:relative w-full h-[60px] z-50" currentUser={session?.user}></NavBar>
            <ScheduledTaskContainers className="w-full md:h-[calc(100vh-60px)] h-auto top-[60px] absolute"></ScheduledTaskContainers>
            <TaskDialog>
                <Button className="fixed bottom-6 right-6 p-6">
                    <div className="flex gap-x-2 items-center">
                        <FaPlus size={20}></FaPlus>
                        <span className="text-lg">Add Task</span>
                    </div>
                </Button>
            </TaskDialog>
        </main>
    );
};

export default HomePage;
