import clsx from "clsx";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={clsx("container mx-auto py-4", className)}>{children}</div>
  );
};

export default Container;
