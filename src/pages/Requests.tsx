import Footer from "../components/Footer";
import Header from "../components/Header";
import RequestsType from "../components/RequestsType";

function Requests() {
	return (
		<>
			<Header />
			<main className="min-h-screen mt-1">
				<RequestsType />
			</main>
			<Footer />
		</>
	);
}

export default Requests;
