import Footer from "../components/Footer";
import Header from "../components/Header";
import OrganizationInfo from "../components/OrganizationInfo";
import SupportThoseWhoNeed from "../components/SupportThoseWhoNeed";
import WhoAreWe from "../components/WhoWeAreStats";
import AboutVideoDescription from "../components/AboutVideoDescription";
import ContactUs from "../components/ContactUs";
import AboutUsBackground from "../components/AboutUsBackground";
import GetInTouch from "../components/GetInTouch";

function AboutUs() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-1">
        <AboutUsBackground />
        <WhoAreWe />
        <SupportThoseWhoNeed />
        <OrganizationInfo />
        <AboutVideoDescription />
        <GetInTouch />
        <ContactUs />
      </main>

      <Footer />
    </>
  );
}

export default AboutUs;
