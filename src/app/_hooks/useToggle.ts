import { useState } from "react";

export const useToggle = (defaultToggle: boolean = false) => {
  const toggleState = useState(defaultToggle);
  return toggleState;
};
