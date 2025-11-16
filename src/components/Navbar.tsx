type NavbarProps = {
	menuitems: string[];
};

const Navbar = ({ menuitems }: NavbarProps) => {
	function moveToFooterSmoothly(
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
	) {
		e.preventDefault();
		const footer = document.getElementById("footer-id");
		footer?.scrollIntoView({ behavior: "smooth" });
	}

	return (
		<div className="flex gap-6 bg-[#F3F2E7] items-center">
			{menuitems.map((menuitem) => (
				<a
					href="#"
					className="text-black-100 opacity-50 text-base hover:text-white">
					{menuitem}
				</a>
			))}
			<a
				href="#"
				className="text-black-100 opacity-50 text-base hover:text-white "
				onClick={moveToFooterSmoothly}>
				About Us
			</a>
		</div>
	);
};
export default Navbar;
