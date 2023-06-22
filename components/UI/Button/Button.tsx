import React from "react";

interface Props {
  onClick?: (e: any) => void;
  id?: string;
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({
  onClick,
  className,
  type,
  disabled,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${disabled ? "disabled" : ""} ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};
export default Button;
