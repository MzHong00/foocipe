import styels from "./index.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const FadeLayout = ({ children, className, ...props }: Props) => {
  return (
    <div className={`${styels.container} ${className}`} {...props}>
      {children}
    </div>
  );
};
