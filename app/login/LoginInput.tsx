/* eslint-disable no-unused-vars */
import React, { ChangeEvent, FocusEvent } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import classes from "./LoginInput.module.css";

interface Props {
  id?: string;
  label?: string;
  type?: string;
  name?: string;
  invalid?: boolean;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (e: ChangeEvent<any>) => void;
  onBlur?: (e: FocusEvent<any, Element>) => void;
  passwordIcon?: boolean;
  showPassword?: boolean;
  setShowPassword?: (showPassword: boolean) => void;
}

const Input: React.FC<Props> = ({
  label,
  className,
  invalid = false,
  passwordIcon,
  showPassword,
  setShowPassword,
  ...others
}) => {
  return (
    <div
      className={`${className} ${classes.input__group}`}
      data-testid="login__input"
    >
      <label className={classes.label}>{label}</label>
      <input
        {...others}
        className={`${invalid ? `${classes.is__invalid}` : ""} ${
          classes.input
        }`}
      ></input>
      {passwordIcon ? (
        <div
          className={classes.eye}
          onClick={() => setShowPassword?.(!showPassword)}
        >
          {showPassword ? (
            <span className={classes.eyeSvg}>
              <AiFillEyeInvisible />
            </span>
          ) : (
            <span className={classes.eyeSvg}>
              <AiFillEye />
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
