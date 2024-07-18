import { Task } from "@/components/task/task";

const HomePage = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[600px] h-[600px] p-10">
                <Task></Task>
            </div>
        </div>
    );
};

export default HomePage;
