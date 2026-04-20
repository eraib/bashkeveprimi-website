import "./index.css";
import { Outlet } from "react-router-dom";
import { DonationProvider } from "./lib/DonationContext";
import DonationModal from "./components/DonationModal";

function App() {
	return (
		<DonationProvider>
			<Outlet />
			<DonationModal />
		</DonationProvider>
	);
}

export default App;
