import { clsx } from "clsx";

interface MenuItem {
	title: string;
	action?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
type NavbarProps = {
	menuitems: MenuItem[];
};

const Navbar = ({ menuitems }: NavbarProps) => {
	// TODO: implement routering to display border bottom on active the menuitem
	// const { isActiveTab } = useIsActiveTab();

	return (
		<div className="flex gap-6 bg-[#F3F2E7] items-center">
			{menuitems.map((menuitem) => (
				<a
					href="#"
					onClick={(e) => menuitem?.action?.(e)}
					className={clsx(
						"text-black-100 opacity-50 text-base hover:text-white"
						// isActiveTab ? " border-b" : ""
					)}>
					{menuitem.title}
				</a>
			))}
		</div>
	);
};
export default Navbar;
