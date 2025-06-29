import ProjectDetailsClient from "@/components/Projects/ProjectsDetails";

const ProjectDetailsPage = () => {
  return (
    <div>
      <ProjectDetailsClient />
    </div>
  );
};

export default ProjectDetailsPage;
export const metadata = {
  title: "Project Details",
  description: "Detailed view of the selected project.",
};
