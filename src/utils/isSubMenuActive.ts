/**
 * Checks if any submenu of a given menu item is currently active based on the current URL path.
 *
 * @param menuitem - The MenuItem object which may contain submenus.
 * @returns boolean - True if one of the submenus matches the current pathname, otherwise false.
 *
 * Example:
 * If current URL is '/about-us' and menuitem.submenus contains [{ title: 'About Us' }],
 * this function will return true.
 */
import type { MenuItem } from "../constants/menuitems";
import { toKebabCase } from "./toKebabCase";

export const isSubMenuActive = (menuitem: MenuItem): boolean => {
	if (!menuitem.submenus) return false;

	// Convert current pathname to a clean kebab-case string for reliable comparison
	// Example: '/about/team' -> 'about/team'
	const currentPathKebab = location.pathname
		.toLowerCase()
		.replace(/^\/|\/$/g, "");

	return menuitem.submenus.some((sub) => {
		// Compare current path against the submenu item's expected path
		const subPathKebab = toKebabCase(sub.title).toLowerCase();

		// We check if the current path exactly matches the submenu path
		return currentPathKebab === subPathKebab;
	});
};
