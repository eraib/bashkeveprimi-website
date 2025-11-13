import logo from "../assets/icons/logo.svg";

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
		<nav className="bg-[#F3F2E7] py-4">
			<div className="h-16 flex items-center justify-between px-4">
				<div className="text-3xl text-white font-bold flex items-center">
					<img src={logo} alt="" />
					<p className="text-[#00CFD0] break-normal max-w-40 text-base ">
						Organizata Bashkeveprimi
					</p>
				</div>

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
			</div>
		</nav>
	);
};
export default Navbar;
