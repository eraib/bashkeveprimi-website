import { Navbar } from "./Navbar";

const Header = () => {
	const menuitems = ["Home", "Orphans", "Projects", "Requests"];

	return <Navbar menuitems={menuitems} />;
};

export default Header;
