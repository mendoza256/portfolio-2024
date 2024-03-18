"use client";

import Link from "next/link";
import { useWindowSize } from "../hooks/useWindowSize";

interface CardVideoProps {
  video: any;
  projectUrl: string;
}

const CardVideo = ({ video, projectUrl }: CardVideoProps) => {
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  return (
    <Link
      className="link image-wrapper relative aspect-w-16 aspect-h-9 cursor-pointer hover:scale-105 transition duration-250"
      target="_blank"
      href={projectUrl ? projectUrl : "#"}
    >
      <video
        className="video filter md:grayscale md:hover:grayscale-0 transition duration-250"
        title={video.fields.title}
        loop
        autoPlay={!isMobile}
        muted
        playsInline
        src={video.fields && "https:" + video.fields.file.url}
        onMouseOver={
          !isMobile
            ? (event) => (event.target as HTMLVideoElement).play()
            : undefined
        }
        onMouseOut={
          !isMobile
            ? (event) => (event.target as HTMLVideoElement).pause()
            : undefined
        }
      />
    </Link>
  );
};

export default CardVideo;
