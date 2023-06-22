import React from "react";
interface Props {
  id?: string;
  field?: string;
  label: string;
  type?: string;
  placeholder?: string;
  invalid?: boolean;
  name: string;
  value?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  multiple?: boolean | undefined;
}

const InputField: React.FC<Props> = ({
  field = "input",
  label,
  type,
  multiple,
  ...others
}) => {
  return (
    <div className="input__group">
      <label>{label}</label>
      {field === "input" ? (
        <input {...others} multiple={multiple} type={type}></input>
      ) : (
        <textarea {...others}></textarea>
      )}
    </div>
  );
};
export default InputField;
