// import from react
import * as React from "react";
// import from reactstrap
import { Button } from "reactstrap";
// import styles
import "./styles.scss";

type Props = {
  children?: React.ReactNode;
  color?: string;
  isoutline?: boolean;
  size?: string;
  active?: boolean;
  close?: boolean;
  block?: boolean;
  onClick?: React.MouseEventHandler;
  id?: string;
  disabled?: boolean;
  classname?: string;
  type?: "submit" | "reset" | "button";
};

const CustomButton: React.FC<Props> = ({
  children,
  color,
  isoutline,
  id,
  size,
  active,
  classname,
  close,
  block,
  onClick,
  disabled,
  type,
}) => {
  return (
    <div className="btn-container">
      <Button
        color={color}
        outline={isoutline}
        size={size}
        block={block}
        type={type ? type : "submit"}
        className={`custom-btn ${classname} ${disabled ? "disableBtn" : ""}`}
        onClick={onClick}
        disabled={disabled}
        id={id}
      >
        {children}
      </Button>
    </div>
  );
};

export default CustomButton;
