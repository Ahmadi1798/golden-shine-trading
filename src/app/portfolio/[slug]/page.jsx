import { notFound } from 'next/navigation';

import ProjectDetailPage from '../../../site-pages/ProjectDetailPage';
import { getPublicPageWithContent } from '../../../lib/content';
import { getAdminSessionFromCookies } from '../../../lib/admin-auth';
import { extractProjectsFromSections, findProjectBySlug, DEFAULT_PROJECTS } from '../../../utils/projects';

const FALLBACK_META = {
  title: 'KarFamSoft | Project',
  description: 'View our project portfolio at KarFamSoft.',
};

async function fetchPortfolioSections(preview = false) {
  const page = await getPublicPageWithContent('portfolio', undefined, {
    preview,
  });

  return page?.sections || [];
}

export async function generateStaticParams() {
  const allSlugs = new Set();

  try {
    const sections = await fetchPortfolioSections(false);
    const dbProjects = extractProjectsFromSections(sections);
    dbProjects.forEach((p) => { if (p.slug) allSlugs.add(p.slug); });
  } catch {
    // fall through to defaults
  }

  DEFAULT_PROJECTS.forEach((p) => { if (p.slug) allSlugs.add(p.slug); });

  return Array.from(allSlugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const slug = resolvedParams?.slug;
    const sections = await fetchPortfolioSections(false);
    let project = findProjectBySlug(sections, slug);
    if (!project) {
      project = DEFAULT_PROJECTS.find((p) => p.slug === slug) || null;
    }

    if (!project) return FALLBACK_META;

    return {
      title: `${project.title} | KarFamSoft Portfolio`,
      description: project.description || FALLBACK_META.description,
    };
  } catch {
    return FALLBACK_META;
  }
}

export default async function ProjectRoute({ params, searchParams }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug;
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const isPreviewRequested = resolvedSearchParams?.preview === '1';
  const adminSession = isPreviewRequested ? await getAdminSessionFromCookies() : null;
  const isPreviewEnabled = Boolean(adminSession) && isPreviewRequested;

  const sections = await fetchPortfolioSections(isPreviewEnabled);
  let project = findProjectBySlug(sections, slug);
  if (!project) {
    project = DEFAULT_PROJECTS.find((p) => p.slug === slug) || null;
  }

  if (!project) {
    notFound();
  }

  const allProjects = extractProjectsFromSections(sections);
  const relatedProjects = allProjects.filter(
    (p) => p.slug !== slug && p.category === project.category
  );

  return <ProjectDetailPage project={project} relatedProjects={relatedProjects} />;
}
