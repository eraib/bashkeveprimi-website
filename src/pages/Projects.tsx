import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectsContent from "../components/ProjectsContent";

function Projects() {
	return (
		<>
			<Header />
			<main className="min-h-screen mt-1">
				<ProjectsContent />
			</main>
			<Footer />
		</>
	);
}

export default Projects;
