import React, { ComponentProps } from "react";
import Select from "react-select";
import { Input } from "reactstrap";
import "./styles.scss";

interface SelectInputProps {
  name?: string;
  label?: string;
  options?: { value: string; label: string }[];
  control?: any; // React Hook Form control instance
  error?: any; // React Hook Form error for this field
  field?: ComponentProps<typeof Input>["field"];
  valid?: ComponentProps<typeof Input>["valid"];
  invalid?: ComponentProps<typeof Input>["invalid"];
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  options,
  error,
  control,
  invalid,
  field,
}) => {
  console.log("field", field);
  return (
    <div className="input-container">
      <Select
        {...field}
        options={options}
        isClearable
        isSearchable
        className="input"
        name={name}
        invalid={invalid}
        control={control}
      />
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default SelectInput;
