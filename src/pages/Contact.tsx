import Footer from "../components/Footer";
import Header from "../components/Header";
import GetInTouch from "../components/GetInTouch";

function Contact() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-1">
        <GetInTouch />
      </main>
      <Footer />
    </>
  );
}

export default Contact;
