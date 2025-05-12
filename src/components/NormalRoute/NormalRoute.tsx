import Banner from "../Banner";
import CookieConsent from "../CookieConsent";
import LatestArticles from "../LatestArticles";
import ProjectsSection from "../ProjectsSection";
import ScrollToTopWithProgress from "../ScrollToTopWithProgress";
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
       <CookieConsent />
        <Banner />
        <SkillsSection />
        <SkillsMarquee />
        <WorkExperience />
        <ProjectsSection />
        <StatsSection />
        <TestimonialSection />
        <WhyChooseMe />
        <Timeline />
        <LatestArticles />
         <ScrollToTopWithProgress />
    </div>
  );
};

export default NormalRoute;