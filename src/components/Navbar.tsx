import { NavLink } from "react-router-dom";
import { toKebabCase } from "../utils/toKebabCase";

interface MenuItem {
  title: string;
  action?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
type NavbarProps = {
  menuitems: MenuItem[];
};

const Navbar = ({ menuitems }: NavbarProps) => {
  return (
    <div className="flex gap-2 sm:gap-3 md:gap-6 bg-[#F3F2E7] items-center flex-wrap sm:flex-nowrap">
      {menuitems.map((menuitem) => (
        <NavLink
          //  to={toKebabCase(menuitem.title)}
          to={`/${toKebabCase(menuitem.title)}`}
          className={({ isActive }) =>
            isActive
              ? "text-black-100 opacity-50 text-xs sm:text-sm md:text-base hover:text-white border-b whitespace-nowrap"
              : "text-black-100 opacity-50 text-xs sm:text-sm md:text-base hover:text-white whitespace-nowrap"
          }
        >
          {menuitem.title}
        </NavLink>
      ))}
    </div>
  );
};
export default Navbar;
