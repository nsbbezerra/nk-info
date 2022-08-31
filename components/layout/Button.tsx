import { ReactNode, useRef } from "react";

interface Props {
  buttonSize?: "xs" | "sm" | "md" | "lg";
  isFullSize?: boolean;
  icon?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
}

type ButtonProps = JSX.IntrinsicElements["button"] & Props;

export default function Button({
  buttonSize = "md",
  children,
  isFullSize = false,
  icon,
  isLoading = false,
  isDisabled = false,
  ...rest
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const xsClass = `${
    isLoading === true || isDisabled === true
      ? "bg-sky-300 cursor-not-allowed"
      : "bg-sky-700 hover:bg-sky-800 active:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
  } px-2 h-7 text-xs text-white rounded-md flex items-center justify-center gap-2 transition-all delay-75 select-none ${
    isFullSize ? "w-full" : "w-fit"
  }`;
  const smClass = `${
    isLoading === true || isDisabled === true
      ? "bg-sky-300 cursor-not-allowed"
      : "bg-sky-700 hover:bg-sky-800 active:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
  } px-3 h-8 text-sm text-white justify-center rounded-md flex items-center gap-2 transition-all delay-75 ${
    isFullSize ? "w-full" : "w-fit"
  } select-none`;
  const mdClass = `${
    isLoading === true || isDisabled === true
      ? "bg-sky-300 cursor-not-allowed"
      : "bg-sky-700 hover:bg-sky-800 active:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
  } px-4 h-10 text-white rounded-md flex justify-center items-center gap-2 transition-all delay-75 ${
    isFullSize ? "w-full" : "w-fit"
  } select-none`;
  const lgClass = `${
    isLoading === true || isDisabled === true
      ? "bg-sky-300 cursor-not-allowed"
      : "bg-sky-700 hover:bg-sky-800 active:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
  } px-5 h-12 text-lg text-white rounded-md flex justify-center items-center gap-2 transition-all delay-75 ${
    isFullSize ? "w-full" : "w-fit"
  } select-none`;

  return (
    <button
      ref={buttonRef}
      className={
        (buttonSize === "xs" && xsClass) ||
        (buttonSize === "sm" && smClass) ||
        (buttonSize === "md" && mdClass) ||
        (buttonSize === "lg" && lgClass) ||
        mdClass
      }
      {...rest}
      disabled={isDisabled === true || isLoading === true ? true : false}
    >
      {isLoading ? (
        <div
          className={`${
            (buttonSize === "xs" && "w-3 h-3") ||
            (buttonSize === "sm" && "w-4 h-4") ||
            (buttonSize === "md" && "w-5 h-5") ||
            (buttonSize === "lg" && "w-6 h-6")
          }`}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 128 128"
            className="animate-spin"
          >
            <path
              fill="#fff"
              d="M64.4 16a49 49 0 0 0-50 48 51 51 0 0 0 50 52.2 53 53 0 0 0 54-52c-.7-48-45-55.7-45-55.7s45.3 3.8 49 55.6c.8 32-24.8 59.5-58 60.2-33 .8-61.4-25.7-62-60C1.3 29.8 28.8.6 64.3 0c0 0 8.5 0 8.7 8.4 0 8-8.6 7.6-8.6 7.6z"
            ></path>
          </svg>
        </div>
      ) : (
        <>{icon ? icon : ""}</>
      )}
      {children}
    </button>
  );
}
