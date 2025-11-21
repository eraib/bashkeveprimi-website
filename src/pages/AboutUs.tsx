import Footer from "../components/Footer";
import Header from "../components/Header";
import OrganizationInfo from "../components/OrganizationInfo";
import SupportThoseWhoNeed from "../components/SupportThoseWhoNeed";
import WhoAreWe from "../components/WhoAreWe";

function AboutUs() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-1">
        <WhoAreWe />
        <SupportThoseWhoNeed />
        <OrganizationInfo />
      </main>

      <Footer />
    </>
  );
}

export default AboutUs;
