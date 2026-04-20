import Footer from "../components/Footer";
import Header from "../components/Header";
import OrphansContent from "../components/OrphansContent";

function Orphans() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-1">
        <OrphansContent />
      </main>

      <Footer />
    </>
  );
}

export default Orphans;
