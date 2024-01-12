import { useField } from "formik";
import React from "react";

const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <>
      <div className="flex flex-col font-fira bg-secondary p-5 rounded-full">
        <label className="text-white">{label} :</label>
        <input
        autoComplete="off"
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? "border-2 border-red-600 px-5 py-2 focus:bg-slate-200 opacity-90 outline-none rounded-full"
              : "px-5 py-2 focus:bg-slate-200 opacity-90 outline-none rounded-full"
          }
        />
        {meta.error && meta.touched && (
              <p className="text-xs text-red-400 text-end">{meta.error}</p>
            )}
      </div>
    </>
  );
};

export default CustomInput;
