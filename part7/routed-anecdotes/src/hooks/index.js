import { useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const Reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    Reset,
  };
};

// modules can have several named exports

export const useAnotherHook = () => {
  // ...
};
