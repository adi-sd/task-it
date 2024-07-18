import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1 className="text-blue-600 text-2xl font-medium">Hi there from task-it!</h1>
            <Link href={"/home"}>Home Page</Link>
        </div>
    );
}
