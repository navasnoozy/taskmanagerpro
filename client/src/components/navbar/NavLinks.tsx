//src/components/navbar/NavLinks.tsx

import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { navlinks } from "../../config/navlinks";
import { Link as RouterLink } from "react-router";

interface Props {
  isMobile?: boolean;
  onLinkClick: () => void;
}

export const NavLinks = ({ isMobile = false, onLinkClick }: Props) => {
  return (
    <>
      {navlinks.pages.map((page) =>
        isMobile ? (
          <MenuItem 
            key={page} 
            onClick={onLinkClick}
            component={RouterLink}
            to={`/${page.toLowerCase()}`}
          >
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ) : (
          <Button
            key={page}
            onClick={onLinkClick}
            component={RouterLink}
            to={`/${page.toLowerCase()}`}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page}
          </Button>
        )
      )}
    </>
  );
};
