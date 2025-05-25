import { FieldType } from "@/schema/field-type";
import { useRef } from "react";

type FormInputsProps = {
  type: FieldType;
  value?: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Common base input with floating label
const BaseInput = ({
  id,
  type,
  label,
  value,
  onChange,
}: {
  id: string;
  type: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputRef = useRef(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className="relative w-full">
      <input
        id={id}
        ref={inputRef}
        type={type}
        placeholder={label}
        value={value}
        onChange={handleChange}
        className="peer block w-full border border-gray-300 rounded px-3 py-3 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
      />
      {/* <label
        htmlFor={id}
        className={`absolute left-3
          ${
              value
              ? "top-2 text-xs text-purple-500"
              : "top-1/2 -translate-y-1/2 text-gray-500 text-sm"
          }
          bg-white dark:bg-black px-1 capitalize transition-all duration-200 pointer-events-none`}
      >
        {label}
      </label> */}
    </div>
  );
};

const FormInputs = ({ type, value, onChange, label }: FormInputsProps) => {

  switch (type) {
    case "text":
    case "email":
    case "number":
    case "date":
      return (
        <BaseInput
          id={type}
          type={type}
          value={value}
          onChange={onChange}
          label={label}
        />
      );

    case "file":
      return (
        <div className="">
          <div className="relative w-1/5">
            <button type="button" className="absolute inset-0 bg-purple-500 rounded-sm text-white cursor-pointer font-medium">
              Upload your resume
            </button>
            <input
              id={type}
              type="file"
              className="block border w-full border-gray-300 rounded px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 bg-gray-500 opacity-0 cursor-pointer"
            />
          </div>
          <label
            htmlFor="accept"
            className="flex items-center gap-2 cursor-pointer mt-4"
          >
            <input id="accept" type="checkbox" className="accent-purple-500 w-5" />
            <span>
              Fill out your application with your resume information. This will
              take a few seconds.
            </span>
          </label>
        </div>
      );

    default:
      return <div className="text-red-500">Unsupported field type</div>;
  }
};

export default FormInputs;
