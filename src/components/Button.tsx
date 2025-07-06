import React from "react";
import { mainStore } from "../stores/mainStore";
import { observer } from "mobx-react-lite";

type ButtonProps = {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  color?: "primary" | "error";
};

const btnStyle = {
  small: "px-3 py-2 text-sm",
  large: "px-6 py-2 text-base",
  primary: "bg-blue-600 hover:bg-blue-700",
  error: "bg-red-600 hover:bg-red-700",
};

const Button: React.FC<ButtonProps> = observer(
  ({ name, onClick, color = "primary" }) => {
    return (
      <button
        onClick={onClick}
        className={`${
          btnStyle[mainStore.isMobile ? "small" : "large"]
        } w-full ${
          btnStyle[color]
        } text-white rounded-md transition-colors duration-200 cursor-pointer`}
      >
        {name}
      </button>
    );
  }
);

export default Button;
