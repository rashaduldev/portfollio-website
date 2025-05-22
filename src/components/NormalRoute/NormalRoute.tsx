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
    <div className="bg-gray-100 dark:bg-gray-900">
        <Banner />
        <SkillsSection />
        <SkillsMarquee />
        <WorkExperience />
        <ProjectsSection />
        <StatsSection />
        <TestimonialSection />
        <WhyChooseMe />
        <ServicesCarousel />
        <Timeline />
        <LatestArticles />
        <FaqSection />
    </div>
  );
};

export default NormalRoute;