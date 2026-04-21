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
      <>
        <Header />
        <main className="min-h-screen mt-1 animate-pulse">
          {/* Hero skeleton */}
          <div className="relative min-h-[520px] bg-[#d1d5db]">
            <div className="relative mx-auto flex min-h-[520px] w-full max-w-6xl items-center px-4 py-16 sm:px-8 lg:px-10">
              <div className="max-w-2xl space-y-4">
                <div className="h-3 w-20 rounded bg-white/30" />
                <div className="h-12 w-80 rounded bg-white/30" />
                <div className="h-4 w-96 rounded bg-white/30" />
                <div className="h-4 w-72 rounded bg-white/30" />
              </div>
            </div>
          </div>

          {/* Stats row skeleton */}
          <div className="bg-white py-12 md:py-16">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-10">
              <div className="grid overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(33,52,48,0.12)] md:grid-cols-2 lg:grid-cols-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex min-h-[170px] flex-col items-center justify-center gap-3 border-b border-[#EDEDED] px-6 py-7 md:border-r md:border-b-0 lg:last:border-r-0">
                    <div className="h-10 w-20 rounded bg-gray-200" />
                    <div className="h-[2px] w-14 rounded-full bg-gray-200" />
                    <div className="h-4 w-28 rounded bg-gray-200" />
                  </div>
                ))}
                <div className="flex min-h-[170px] flex-col justify-center gap-3 bg-[#00A5A6]/40 px-8 py-7">
                  <div className="h-6 w-36 rounded bg-white/40" />
                  <div className="h-4 w-28 rounded bg-white/40" />
                </div>
              </div>
            </div>
          </div>

          {/* Support section skeleton */}
          <div className="bg-[#F3F2E7] py-12 md:py-16">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                <div className="flex-1 space-y-4">
                  <div className="h-8 w-64 rounded bg-gray-300" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-5/6 rounded bg-gray-200" />
                  <div className="h-4 w-4/6 rounded bg-gray-200" />
                </div>
                <div className="h-64 w-full flex-1 rounded-xl bg-gray-300 md:h-80" />
              </div>
            </div>
          </div>

          {/* Org info skeleton */}
          <div className="bg-white py-12 md:py-16">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-10">
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex-1 space-y-4">
                  <div className="h-8 w-56 rounded bg-gray-300" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-5/6 rounded bg-gray-200" />
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                </div>
                <div className="flex flex-1 gap-4">
                  <div className="h-56 flex-1 rounded-xl bg-gray-200" />
                  <div className="h-56 flex-1 rounded-xl bg-gray-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Video section skeleton */}
          <div className="bg-[#F3F2E7] py-12 md:py-16">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-10 space-y-6">
              <div className="mx-auto h-8 w-96 rounded bg-gray-300" />
              <div className="mx-auto h-[360px] max-w-4xl rounded-xl bg-gray-300" />
            </div>
          </div>
        </main>
        <Footer />
      </>
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
