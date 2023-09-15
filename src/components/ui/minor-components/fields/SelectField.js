import React from "react";

function SelectionField(props) {
const {
    placeholder,
    label,
    id,
    extra,
    style,
    options,
    variant,
    state,
    disabled,
    defaultValue,
    required,
    value,
    onChange,
  } = props;

  return (
    <div className={`${extra}`}>
      {/* <label className={`text-sm font-bold text-navy-700 dark:text-white`}>
        {label}
      </label> */}
      <select
        disabled={disabled}
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        style={style}
        className={`form-control form-input-height ${
          disabled === true
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : state === "error"
            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
            : state === "success"
            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
            : "border-gray-200 dark:!border-white/10 dark:text-white"
        }`}
          >
        <option selected hidden>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectionField;
