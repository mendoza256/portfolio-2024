import Link from "next/link";
import { getEntriesByContentType, getSingleEntry } from "../hooks/getData";
import { ProjectListType, ProjectType } from "../utils/baseTypes";
import { Card } from "./Card";
import Image from "next/image";

const Cards = async () => {
  const projects: ProjectType[] | undefined = [];
  const unsortedProjects = await getEntriesByContentType("project");

  const projectOrder = await getSingleEntry("73HGNSCj36fJdySraU9nGa");
  const order = projectOrder.fields.order;

  const aboutEntry = getSingleEntry("B4PeBydliOcPS7hYguoB0").then(
    (res) => res.fields
  );

  if (order) {
    order.forEach((project: ProjectListType) => {
      const match = unsortedProjects?.find(
        (unsortedOroject: { id: string }) =>
          unsortedOroject.id === project.sys.id
      );
      if (match) {
        projects?.push(match);
      }
    });
  }
  return (
    <section className="grid min-h-screen p-24 grid-cols-3 gap-8">
      {projects.map((project, i) => {
        const { projectUrl, gif, previewImage } = project;
        return (
          <Card
            key={i}
            className="rounded-[22px] w-full h-full p-4 sm:p-10 bg-white dark:bg-zinc-900 cursor-pointer"
            index={i}
          >
            {gif && previewImage && (
              <Link
                className="link image-wrapper relative aspect-w-16 aspect-h-9"
                target="_blank"
                href={projectUrl ? projectUrl : ""}
              >
                <Image
                  className="gif-image absolute invisible hover:visible"
                  src={"https:" + gif.fields.file.url}
                  alt={"gif image"}
                  width={768}
                  height={432}
                />
                <Image
                  className="preview-image"
                  src={"https:" + previewImage.fields.file.url}
                  alt={"preview image"}
                  width={768}
                  height={432}
                />
                <div className="svg-container">{/* <LinkOutline /> */}</div>
              </Link>
            )}
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={projectUrl}>View Project</a>
          </Card>
        );
      })}
      {aboutEntry && (
        <Card className="rounded-[22px] w-full h-full p-4 sm:p-10 bg-white dark:bg-zinc-900 cursor-pointer">
          <h2>{aboutEntry.title}</h2>
          <p>{aboutEntry.description}</p>
          <a href={aboutEntry.projectUrl}>View Project</a>
        </Card>
      )}
    </section>
  );
};

export default Cards;
