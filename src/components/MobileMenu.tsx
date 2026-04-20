import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { menuitems } from "../constants/menuitems";
import { toKebabCase } from "../utils/toKebabCase";
import { BiChevronDown, BiX } from "react-icons/bi";
import clsx from "clsx";

type MobileMenuProps = {
	isOpen: boolean;
	onClose: () => void;
};

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setOpenSubmenu(null);
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 z-200 bg-black/40 transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={clsx(
          "fixed top-0 right-0 z-201 h-full w-[280px]",
          "flex flex-col",
          "bg-[#F0FAFA] border-l border-[#00CFD0]/20 shadow-xl",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}>
        {/* Header — height matches site header so X lines up with hamburger */}
        <div className="h-[68px] flex items-center justify-between px-4 border-b border-[#00CFD0]/20">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#00CFD0]">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#00CFD0]/10 transition-colors">
            <BiX className="w-6 h-6 text-black/50" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col no-scrollbar">
          {menuitems.map((item) => {
            if (item.submenus) {
              const isExpanded = openSubmenu === item.title;
              return (
                <div key={item.title} className="flex flex-col">
                  <button
                    onClick={() =>
                      setOpenSubmenu(isExpanded ? null : item.title)
                    }
                    className={clsx(
                      "flex items-center justify-between px-4 py-3 rounded-md text-left",
                      "font-medium text-sm transition-colors duration-150",
                      isExpanded
                        ? "bg-[#00CFD0]/10 text-[#00CFD0]"
                        : "text-black/60 hover:bg-[#00CFD0]/8 hover:text-black/80",
                    )}>
                    {item.title}
                    <BiChevronDown
                      className={clsx(
                        "w-4 h-4 text-black/40 transition-transform duration-200",
                        isExpanded && "rotate-180 text-[#00CFD0]",
                      )}
                    />
                  </button>

                  {/* Nested submenu */}
                  <div
                    className={clsx(
                      "flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
                      isExpanded ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
                    )}>
                    <div className="ml-4 border-l border-[#00CFD0]/30 flex flex-col py-1">
                      {item.submenus.map((sub) => (
                        <NavLink
                          key={sub.title}
                          to={`/${toKebabCase(sub.title)}`}
                          onClick={onClose}
                          className={({ isActive }) =>
                            clsx(
                              "px-4 py-2.5 text-sm transition-colors duration-150",
                              isActive
                                ? "text-[#00CFD0] font-medium"
                                : "text-black/50 hover:text-black/80",
                            )
                          }>
                          {sub.title}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={item.title}
                to={item.title === "Home" ? "/" : `/${toKebabCase(item.title)}`}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    "px-4 py-3 rounded-md font-medium text-sm",
                    "transition-colors duration-150",
                    isActive
                      ? "text-[#00CFD0] bg-[#00CFD0]/10"
                      : "text-black/60 hover:bg-[#00CFD0]/8 hover:text-black/80",
                  )
                }>
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom CTAs */}
        <div className="px-4 py-4 border-t border-[#00CFD0]/20">
          <button
            onClick={() => {
              onClose();
              navigate("/requests");
            }}
            className="w-full text-white py-2.5 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#1e3a5f" }}>
            Make a Request
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
