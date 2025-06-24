import Banner from "../Banner";
import FaqSection from "../FAQ";
import LatestArticles from "../LatestArticles";
import ProjectsSection from "../ProjectsSection";
import ServicesCarousel from "../ServicesCarouse";
import SkillsMarquee from "../SkillsMarquee";
import SkillsSection from "../SkillsSection";
import StatsSection from "../StatsCountSection";
import TestimonialSection from "../TestimonialSection";
import Timeline from "../Timeline";
import WhyChooseMe from "../WhyChooseMe";
import WorkExperience from "../WorkExperience";

const NormalRoute = () => {
  return (
    <>
      {/* Banner full width */}
      <Banner />

      {/* Container content */}
      <div className="md:mx-auto mx-5 max-w-7xl">
        <SkillsSection />
        <SkillsMarquee />
        <WorkExperience />
        <ProjectsSection />
        <StatsSection />
      </div>

      {/* Testimonial section full width and centered in layout */}
      <TestimonialSection />

      {/* Continue container content */}
      <div className="md:mx-auto mx-5 max-w-7xl">
        <WhyChooseMe />
        <ServicesCarousel />
        <Timeline />
        <LatestArticles />
        <FaqSection />
      </div>
    </>
  );
};

export default NormalRoute;
