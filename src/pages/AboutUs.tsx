import Footer from "../components/Footer";
import Header from "../components/Header";
import OrganizationInfo from "../components/OrganizationInfo";
import SupportThoseWhoNeed from "../components/SupportThoseWhoNeed";
import WhoAreWe from "../components/WhoWeAreStats";
import AboutVideoDescription from "../components/AboutVideoDescription";
import AboutUsBackground from "../components/AboutUsBackground";
import ContactUs from "../components/ContactUs";

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
        <ContactUs />
      </main>

      <Footer />
    </>
  );
}

export default AboutUs;
