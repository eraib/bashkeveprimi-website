import BashkeveprimiFeatures from "../components/BashkeveprimiFeatures";
import BashkeveprimiInfo from "../components/BashkeveprimiInfo";
import Footer from "../components/Footer";
import Header from "../components/Header";
import OrganizationRecentFeatures from "../components/OrganizationRecentFeatures";
import PeriodicActions from "../components/PeriodicActions";
import "../index.css";

function Home() {
	return (
		<>
			<Header />
			<main className="min-h-screen mt-1">
				<PeriodicActions />
				<BashkeveprimiFeatures />
				<OrganizationRecentFeatures />
				<BashkeveprimiInfo />
			</main>

			<Footer />
		</>
	);
}

export default Home;
