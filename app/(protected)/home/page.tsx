import { auth } from "@/auth/auth";
import { NavBar } from "@/components/commons/navbar";
import { ScheduledTaskContainers } from "@/components/container/scheduled-task-containers";

const HomePage = async () => {
    const session = await auth();

    return (
        <main className="w-full h-full md:overflow-hidden overflow-y-scroll">
            <NavBar className="fixed md:relative w-full h-[60px] z-50" currentUser={session?.user}></NavBar>
            <ScheduledTaskContainers className="w-full md:h-[calc(100vh-60px)] h-auto top-[60px] absolute"></ScheduledTaskContainers>
        </main>
    );
};

export default HomePage;
