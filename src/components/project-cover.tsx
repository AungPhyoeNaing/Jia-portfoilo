import Image from 'next/image';
import type { Project } from '@/data/projects';

export function ProjectCover({ project, detail = false }: { project: Project; detail?: boolean }) {
  const { image } = project.artwork;
  const sizes = detail ? '(max-width: 750px) 100vw, 1120px' : '(max-width: 750px) 100vw, 780px';

  return (
    <div className="project-art custom-art">
      <div className="custom-art-screen">
        <Image src={image.src} alt={image.alt} fill sizes={sizes} preload={detail} />
      </div>
    </div>
  );
}
