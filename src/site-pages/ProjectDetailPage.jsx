'use client';

import ProjectHero from '../Components/Portfolio/ProjectHero';
import ProjectDetails from '../Components/Portfolio/ProjectDetails';
import RelatedProjects from '../Components/Portfolio/RelatedProjects';
import { useLanguage } from '../context/LanguageContext';
import { resolveLocalizedContent } from '../lib/localized-content';
import { applyLocalizedProjectFallback, applyLocalizedProjectFallbackList } from '../utils/projects';

const ProjectDetailPage = ({ project, relatedProjects = [] }) => {
  const { language } = useLanguage();
  const localizedProject = applyLocalizedProjectFallback(
    resolveLocalizedContent(project || {}, language),
    language
  );
  const localizedRelatedProjects = applyLocalizedProjectFallbackList(
    resolveLocalizedContent(relatedProjects || [], language),
    language
  );

  return (
    <div className="home-page-theme-bg">
      <ProjectHero project={localizedProject} />
      <ProjectDetails project={localizedProject} />
      <RelatedProjects projects={localizedRelatedProjects} category={localizedProject.category} />
    </div>
  );
};

export default ProjectDetailPage;
