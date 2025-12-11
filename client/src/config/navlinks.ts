//src/config/navlinks.ts

interface NavLinks {
  pages: string[];
  userMenuLinks: { label: string; to: string }[];
}

export const navlinks: NavLinks = {
  pages: ["TASKS", "DASHBOARD"],
  userMenuLinks: [
    { label: "Profile", to: "/profile" },
    { label: "Settings", to: "/settings" },
  ],
};
