import React, { ComponentProps, PropsWithChildren } from "react";
interface BoxProps extends ComponentProps<"div">, PropsWithChildren {}
const Box = ({ children, ...props }: BoxProps) => {
  return <div {...props}>{children}</div>;
};

export { Box };
