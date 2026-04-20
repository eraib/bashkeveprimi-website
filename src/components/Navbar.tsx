import { NavLink } from "react-router-dom";
import { toKebabCase } from "../utils/toKebabCase";
import type { MenuItem } from "../constants/menuitems";
import { BiChevronDown } from "react-icons/bi";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { isSubMenuActive } from "../utils/isSubMenuActive";

type NavbarProps = {
  menuitems: MenuItem[];
};

const Navbar = ({ menuitems }: NavbarProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="hidden md:flex gap-4 lg:gap-6 flex-row bg-[#F3F2E7] items-center">
      {menuitems.map((menuitem) => (
        <div key={menuitem.title} className="relative flex flex-col">
          <div className="flex items-center gap-1">
            {menuitem.submenus ? (
              <button
                onClick={() => toggleDropdown(menuitem.title)}
                className={clsx(
                  "cursor-pointer text-black/50 whitespace-nowrap flex items-center gap-0.5 transition-all duration-150 hover:text-black/70",
                  (isSubMenuActive(menuitem) ||
                    openDropdown === menuitem.title) &&
                    "text-black/80"
                )}>
                {menuitem.title}
                <BiChevronDown
                  className={clsx(
                    "w-4 h-4 transition-transform duration-200",
                    openDropdown === menuitem.title && "rotate-180"
                  )}
                />
              </button>
            ) : (
              <NavLink
                to={
                  menuitem.title === "Home"
                    ? "/"
                    : `/${toKebabCase(menuitem.title)}`
                }>
                {({ isActive }) => (
                  <span
                    className={clsx(
                      "text-black/50 hover:text-black/70 whitespace-nowrap transition-colors duration-150",
                      isActive && "text-black/80"
                    )}>
                    {menuitem.title}
                  </span>
                )}
              </NavLink>
            )}
          </div>

          {menuitem.submenus && (
            <div
              className={clsx(
                "absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-20 min-w-[160px]",
                "origin-top transition-all duration-200",
                openDropdown === menuitem.title
                  ? "opacity-100 scale-y-100 pointer-events-auto"
                  : "opacity-0 scale-y-95 pointer-events-none"
              )}>
              {/* arrow */}
              <div className="flex justify-center">
                <div className="w-2.5 h-2.5 rotate-45 bg-white border-l border-t border-[#00CFD0]/20 -mb-[5px] relative z-10" />
              </div>
              <div className="bg-white border border-[#00CFD0]/20 rounded-xl shadow-lg shadow-black/5 overflow-hidden">
                {menuitem.submenus.map((sub, i) => (
                  <NavLink
                    key={sub.title}
                    to={`/${toKebabCase(sub.title)}`}
                    onClick={() => setOpenDropdown(null)}
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center gap-2 px-5 py-3 text-sm transition-colors duration-150",
                        "hover:bg-[#F3F2E7] hover:text-[#00CFD0]",
                        isActive
                          ? "text-[#00CFD0] font-medium bg-[#F3F2E7]/60"
                          : "text-black/60",
                        i !== 0 && "border-t border-black/5"
                      )
                    }>
                    {({ isActive }) => (
                      <>
                        <span
                          className={clsx(
                            "w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-150",
                            isActive ? "bg-[#00CFD0]" : "bg-black/20"
                          )}
                        />
                        {sub.title}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
