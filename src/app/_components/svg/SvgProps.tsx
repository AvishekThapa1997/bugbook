import React from "react";

export type SvgProps = React.ComponentProps<"svg"> & {
  pathProps?: React.ComponentProps<"path">;
};
