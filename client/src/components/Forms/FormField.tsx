import { Field, ErrorMessage } from "formik";

interface FormFieldProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    className: string;
    children?: React.ReactNode;
}

const FormField = ({ label, name, type, placeholder, className, children }: FormFieldProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="labelStyles">
          {label}
        </label>
        {children}
      </div>
      <div className="mt-2">
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={className}
        />
        <ErrorMessage name={name} component="div" className="errorMessage" />
      </div>
    </div>
  );
};

export default FormField;