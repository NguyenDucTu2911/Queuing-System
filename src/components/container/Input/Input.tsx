import React from "react";

type inputProps = {
    className?: string
    value?: any,
    placeholder?: string
    type?: string,
    name?: string,
    id?: string
    style?: any
    disabled?: boolean
    children?: React.ReactNode;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ className, value, placeholder, type, name, id, handleChange, style, children, disabled }: inputProps) => {
    return <input
        className={className}
        type={type}
        value={value}
        name={name}
        id={id}
        placeholder={placeholder}
        style={style}
        disabled={disabled}
        onChange={handleChange}>{children}</input>;
};