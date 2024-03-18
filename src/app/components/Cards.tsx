import { unstable_noStore } from "next/cache";
import { getEntriesByContentType, getSingleEntry } from "../hooks/getData";
import { ProjectListType, ProjectType } from "../utils/baseTypes";
import { Card } from "./Card";
import CardContent from "./CardContent";

const Cards = async () => {
  unstable_noStore();
  const projects: ProjectType[] | undefined = [];
  const unsortedProjects = await getEntriesByContentType("project");

  const projectOrder = await getSingleEntry("73HGNSCj36fJdySraU9nGa");
  const order = projectOrder.fields.order;

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
    <section className="grid min-h-screen p-8 lg:p-24 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {projects.map((project, i) => {
        return (
          <Card
            key={i}
            className="rounded-[22px] w-full h-full p-4 sm:p-10 bg-white dark:bg-zinc-900 min-h-[75vh]"
            index={i}
          >
            <CardContent project={project} />
          </Card>
        );
      })}
    </section>
  );
};

export default Cards;
