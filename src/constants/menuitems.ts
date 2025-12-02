export interface MenuItem {
	title: string;
	submenus?: { title: string }[];
}

export const menuitems: MenuItem[] = [
	{ title: "Home" },
	{
		title: "Programs",
		submenus: [
			{ title: "Orphans" },
			{ title: "Projects" },
			{ title: "Requests" },
		],
	},
	{ title: "About Us" },
	{ title: "Support" },
	{ title: "Emergency" },
];
