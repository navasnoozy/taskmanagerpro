import { Link, type LinkProps } from "react-router";
import type { SxProps, Theme } from "@mui/material";

interface AppLinkProps extends LinkProps {
  sx?: SxProps<Theme>;
  color?: string;
  width?: number | string;
  children: React.ReactNode;
}

const AppLink: React.FC<AppLinkProps> = ({ sx, color, width, children, ...props }) => {
  return (
    <Link
      {...props}
      style={{
        textDecoration: "none",
        color: color || "inherit",
        width: width,
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {children}
    </Link>
  );
};

export default AppLink;
