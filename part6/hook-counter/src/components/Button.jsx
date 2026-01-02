// const Button = ({ dispatch, type, label }) => {
//   return <button onClick={() => dispatch({ type })}>{label}</button>;
// };

// export default Button;

import { useContext } from "react";
import CounterContext from "./CounterContext";

const Button = ({ type, label }) => {
  const { counterDispatch } = useContext(CounterContext);

  return <button onClick={() => counterDispatch({ type })}>{label}</button>;
};

export default Button;
