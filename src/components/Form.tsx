import { Field, Form } from "formik";
import { FC } from "react";
import { FormProps } from "../lib/types";

const CustomForm: FC<FormProps> = ({ name, title, placeholder }) => {
  return (
    <Form className="hidden flex-row gap-1 sm:hidden lg:flex md:flex">
      <label htmlFor={name}>{title}</label>

      <Field
        id={name}
        name={name}
        placeholder={placeholder}
        className="input input-bordered "
      />
      <button className="btn btn-active" type="submit">
        Submit
      </button>
    </Form>
  );
};

export default CustomForm;
