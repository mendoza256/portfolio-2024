import Link from "next/link";
import { ProjectType } from "../utils/baseTypes";
import CardVideo from "./CardVideo";
import LinkOutline from "../../../public/images/link-outline.svg";
import Image from "next/image";

interface CardContentProps {
  project: ProjectType;
}

const CardContent = ({ project }: CardContentProps) => {
  const { projectUrl, agency, agencyUrl, video } = project;

  return (
    <>
      {video && <CardVideo video={video} projectUrl={projectUrl || ""} />}
      <div className="card-content mt-auto flex flex-col pt-4">
        <h2 className="text-lg uppercase font-bold pb-2">{project.title}</h2>
        <p className="pb-4">{project.description}</p>
        {agency && agencyUrl && (
          <Link
            href={agencyUrl}
            className="cursor-pointer hover:underline pb-4"
          >
            Carried out by {agency}
          </Link>
        )}
        <Link
          className="cursor-pointer hover:underline"
          href={projectUrl || "#"}
        >
          <Image
            className="invert"
            src={LinkOutline}
            alt="Link"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </>
  );
};

export default CardContent;
