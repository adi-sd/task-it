import { AuthDialog } from "@/components/auth/auth-dialog";
import { NavBar } from "@/components/commons/navbar";
import { Button } from "@/components/ui/button";

const RootPage = async () => {
    return (
        <main className="w-full h-full overflow-hidden">
            <NavBar className="w-full h-[60px]"></NavBar>
            <div className="w-full h-[calc(100vh-60px)] flex flex-col gap-y-6 items-center justify-center">
                <div className="w-[700px] h-[300px] flex flex-col gap-y-10 items-center justify-center border-4 border-slate-500 rounded-xl">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Welcome to <span className="font-mono font-extrabold text-indigo-500">task-it</span> Please
                            Login/Register to proceed!
                        </h1>
                    </div>
                    <div className="flex gap-x-4">
                        <div>
                            <AuthDialog>
                                <Button variant="default" size="lg" className="text-lg font-semibold">
                                    Login / Register
                                </Button>
                            </AuthDialog>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RootPage;
