import { NavLink } from "react-router-dom";
import { toKebabCase } from "../utils/toKebabCase";
import type { MenuItem } from "../constants/menuitems";
import { BiChevronDown } from "react-icons/bi";
import clsx from "clsx";
import { useState } from "react";
import { isSubMenuActive } from "../utils/isSubMenuActive";

type NavbarProps = {
	menuitems: MenuItem[];
};

const Navbar = ({ menuitems }: NavbarProps) => {
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const toggleDropdown = (title: string) => {
		setOpenDropdown((prev) => (prev === title ? null : title));
	};

	return (
		<div className="hidden md:flex gap-4 lg:gap-6 flex-row bg-[#F3F2E7] items-center">
			{menuitems.map((menuitem) => (
				<div key={menuitem.title} className="relative flex flex-col">
					<div className="flex items-center gap-1">
						{menuitem.submenus ? (
							<div
								onClick={() => toggleDropdown(menuitem.title)}
								className={clsx(
									"cursor-pointer text-black whitespace-nowrap opacity-50 hover:text-black/50 flex items-center gap-1 transition-colors duration-150",
									(isSubMenuActive(menuitem) ||
										openDropdown === menuitem.title) &&
										"border-b border-black/80 opacity-80"
								)}>
								{menuitem.title}
								<BiChevronDown
									className={clsx(
										"w-5 h-5 transition-transform duration-200",
										openDropdown === menuitem.title && "rotate-180",
										"text-black opacity-50"
									)}
								/>
							</div>
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
											"text-black opacity-50 hover:text-black/50 whitespace-nowrap transition-colors duration-150",
											isActive && "border-b border-black/80 opacity-80"
										)}>
										{menuitem.title}
									</span>
								)}
							</NavLink>
						)}
					</div>

					{menuitem.submenus && openDropdown === menuitem.title && (
						<div className="mt-1 -ml-2 flex-col bg-[#F3F2E7] py-2 pl-4 pr-6 rounded shadow-lg flex items-start gap-3 absolute top-full left-0 z-20 min-w-[150px] border border-black/10">
							{menuitem.submenus.map((sub) => (
								<NavLink
									key={sub.title}
									to={`/${toKebabCase(sub.title)}`}
									onClick={() => setOpenDropdown(null)}
									className={({ isActive }) =>
										clsx(
											"text-black opacity-70 hover:opacity-100 w-full transition-colors duration-150",
											isActive && "opacity-100 font-medium"
										)
									}>
									{sub.title}
								</NavLink>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Navbar;
