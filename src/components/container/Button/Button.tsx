type ButtonProps = {
    children?: string;
    onclick?: () => void
} & Omit<React.ComponentProps<"button">, "children">;

export const Button = ({ children, onclick, ...rest }: ButtonProps) => {
    return (
        <button
            onClick={onclick}
            {...rest}>
            {children}
        </button>
    );
};
