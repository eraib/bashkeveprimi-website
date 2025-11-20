import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectAndDescription from "../components/ProjectAndDescription";


function Projects() {
	return (
		<>
	    <Header />
        <main className="min-h-screen mt-1">
		<ProjectAndDescription/>

		</main>

        <Footer />
		</>
	);
}

export default Projects;
