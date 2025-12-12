

interface NavLinks {
  pages: string[];
  userMenuLinks: { label: string; to: string }[];
}

export const navlinks: NavLinks = {
  pages: ["TASKS"],
  userMenuLinks: [
    { label: "Profile", to: "/profile" },
    { label: "Settings", to: "/settings" },
  ],
};
