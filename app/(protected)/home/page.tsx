import { auth } from "@/auth/auth";
import { NavBar } from "@/components/commons/navbar";
import { ScheduledTaskContainers } from "@/components/container/scheduled-task-containers";

const HomePage = async () => {
    const session = await auth();

    return (
        <main className="w-full h-full overflow-hidden">
            <NavBar className="w-full h-[60px]" currentUser={session?.user}></NavBar>
            <ScheduledTaskContainers className="w-full h-[calc(100vh-60px)]"></ScheduledTaskContainers>
        </main>
    );
};

export default HomePage;
