import React, { MouseEventHandler } from 'react';

interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    darkMode: boolean;
    label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, darkMode, label }) => {
    return (
        <button type="button" className="btn-theme p-4 rounded-3xl" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;