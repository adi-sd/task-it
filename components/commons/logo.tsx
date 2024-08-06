interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
    return <div className="text-3xl font-mono font-extrabold mx-6">task-it</div>;
};
