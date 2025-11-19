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
    <div className="flex gap-6 bg-[#F3F2E7] items-center">
      {menuitems.map((menuitem) => (
        <NavLink
          //  to={toKebabCase(menuitem.title)}
          to={`/${toKebabCase(menuitem.title)}`}
          className={({ isActive }) =>
            isActive
              ? "text-black-100 opacity-50 text-base hover:text-white border-b"
              : "text-black-100 opacity-50 text-base hover:text-white"
          }
        >
          {menuitem.title}
        </NavLink>
      ))}
    </div>
  );
};
export default Navbar;
