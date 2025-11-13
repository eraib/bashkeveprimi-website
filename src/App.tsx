import BashkeveprimiFeatures from "./components/BashkeveprimiFeatures";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PeriodicActions from "./components/PeriodicActions";
import './index.css' 

function App() {
	return (
	<>
	<Header/>
	 <main className="min-h-screen mt-1">
		<PeriodicActions/>
		<BashkeveprimiFeatures/>
      </main>
	  
	<Footer/>
	</>);
}

export default App;
