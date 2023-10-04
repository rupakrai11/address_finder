// import form react
import * as React from "react"
import { ComponentProps } from "react"
import { InputHTMLAttributes } from "react"
// import from reactstrap
import { Input, FormFeedback } from "reactstrap"
// import styles
import "./styles.scss"

interface InputProps extends InputHTMLAttributes<HTMLAreaElement> {
  type?: ComponentProps<typeof Input>["type"]
  bsSize?: ComponentProps<typeof Input>["bsSize"]
  children?: React.ReactNode
  valid?: ComponentProps<typeof Input>["valid"]
  invalid?: ComponentProps<typeof Input>["invalid"]
  placeholder?: ComponentProps<typeof Input>["placeholder"]
  onChange?: ComponentProps<typeof Input>["onchange"]
  field?: ComponentProps<typeof Input>["field"]
  error?: ComponentProps<typeof Input>["error"]
  disabled?: ComponentProps<typeof Input>["disabled"]
}

const TextInput: React.FC<InputProps> = ({
  type,
  bsSize,
  invalid,
  placeholder,
  field,
  error,
  disabled
}) => {
  console.log(error)
  return (
    <React.Fragment>
      <div className="input-container">
        <Input
          className="input"
          type={type}
          bsSize={bsSize}
          invalid={invalid}
          placeholder={placeholder}
          disabled={disabled}
          {...field}
        />
      </div>
      <FormFeedback>{error}</FormFeedback>
    </React.Fragment>
  )
}

export default TextInput
