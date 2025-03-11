import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FormControl } from "./GenericControls";

interface InputControlProps {
  item: FormControl;
  register: UseFormRegister<any>; // <-- Tipado de react-hook-form
  errors: FieldErrors<any>;
  loading?: boolean;
}

const InputControl: React.FC<InputControlProps> = ({
  item,
  register,
  errors,
  loading,
}) => {
  const [show, setShow] = React.useState(false);

  const getInputControl = () => {
    switch (item.type) {
      case "password":
        return (
          <div className="relative w-full">
            <input
              id={`${item.name}-${item.id}`}
              type={show ? "text" : item.type}
              {...register(item.name, {
                required: item.required && item.message,
                pattern: item.pattern && item.pattern,
              })}
              disabled={loading || item.disabled}
              placeholder={item.placeholder}
              className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700"
            >
              {show ? (
                <Icon icon="material-symbols:visibility-off" width={18} />
              ) : (
                <Icon icon="material-symbols:visibility" width={18} />
              )}
            </button>
          </div>
        );
      case "select":
        return (
          <select
            id={`${item.name}-${item.id}`}
            {...register(item.name, {
              required: item.required && item.message,
              pattern: item.pattern && item.pattern,
            })}
            disabled={loading || item.disabled}
            className="block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          >
            <option value="" disabled selected hidden>
              {item.placeholder || "Selecciona una opción"}
            </option>
            {item.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-2 flex items-center px-2 text-gray-500">
              {item.prefix && <span>{item.prefix}</span>}
            </div>
            <input
              id={`${item.name}-${item.id}`}
              type={item.type}
              {...register(item.name, {
                required: item.required && item.message,
                pattern: item.pattern && item.pattern,
              })}
              disabled={loading || item.disabled}
              placeholder={item.placeholder}
              className={`w-full block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 ${
                item.prefix ? "pl-10" : ""
              } `}
            />
          </div>
        );
    }
  };

  return (
    <div className="my-2">
      <label
        htmlFor={item.name}
        className="block text-md/6 font-medium text-gray-900"
      >
        {item.label}
        {item.required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-500">
        {getInputControl()}
      </div>
      {errors[item.name] && (
        <span className="text-red-600 text-xs/6">
          {errors[item.name]?.message ? String(errors[item.name]?.message) : ""}
        </span>
      )}
    </div>
  );
};

export default InputControl;
