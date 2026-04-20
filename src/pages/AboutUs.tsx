import Footer from "../components/Footer";
import Header from "../components/Header";
import OrganizationInfo from "../components/OrganizationInfo";
import SupportThoseWhoNeed from "../components/SupportThoseWhoNeed";
import WhoAreWe from "../components/WhoWeAreStats";
import AboutVideoDescription from "../components/AboutVideoDescription";
import AboutUsBackground from "../components/AboutUsBackground";
import ContactUs from "../components/ContactUs";
import { useAboutPage } from "../lib/queries";

function AboutUs() {
  const { data, isLoading } = useAboutPage();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F2E7]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#00CFD0] border-t-transparent" />
          <p className="font-['Rowdies'] text-sm tracking-widest text-[#213430]/60 uppercase">
            Loading about us page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen mt-1">
        <AboutUsBackground
          heroTitle={data?.hero_title}
          heroSubtitle={data?.hero_subtitle}
          heroImage={data?.hero_image}
        />
        <WhoAreWe
          stats={data?.stats}
          ctaTitle={data?.cta_title}
          ctaLinkText={data?.cta_link_text}
          ctaUrl={data?.cta_url}
        />
        <SupportThoseWhoNeed
          title={data?.support_title}
          body={data?.support_body}
          image={data?.support_image}
        />
        <OrganizationInfo
          orgTitle={data?.org_title}
          missionText={data?.mission_text}
          visionText={data?.vision_text}
          valuesText={data?.values_text}
          orgImage1={data?.org_image_1}
          orgImage2={data?.org_image_2}
        />
        <AboutVideoDescription
          videoTitle={data?.video_title}
          videoUrl={data?.video_url}
        />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}

export default AboutUs;
