import { PortfolioItem } from "@/types/portfolio";
import Link from "next/link";
import YarnHeader from "./YarnHeader";
import { RiExternalLinkLine, RiGithubFill } from "react-icons/ri";

type PortfolioContentItemProps = {
  item: PortfolioItem[number];
};

const PortfolioContentItem = ({ item }: PortfolioContentItemProps) => {
  return (
    <>
      <Link href={item.links.other || ""} target="_blank">
        {item.name === "Yarn" ? (
          <YarnHeader />
        ) : (
          <h1 className="text-4xl text-start font-bold hover:text-gray-700 hover:dark:text-gray-300">
            {item.name}
          </h1>
        )}
      </Link>
      <div className="prose dark:prose-invert flex items-center justify-start gap-4">
        <p className="text-start font-light pt-1 text-lime-700 dark:text-lime-300">
          <span className="text-black dark:text-white font-medium">
            Made with:
          </span>{" "}
          {item.technologies.join("   ")}
        </p>
      </div>
      <div className="prose dark:prose-invert font-light flex items-center">
        <p>{item.projectOverview}</p>
      </div>
      <div className="prose dark:prose-invert flex items-center justify-start gap-4">
        <p className="text-start font-light pt-1">
          <span className="text-black dark:text-white font-medium">Role:</span>{" "}
          {item.roles}
        </p>
      </div>
      <Link href={item.links.live} target="_blank">
        <p className="text-start font-light text-lime-700 dark:text-lime-300 hover:text-gray-700 hover:dark:text-gray-300 flex items-center gap-1">
          <RiExternalLinkLine />
          Live
        </p>
      </Link>
      {item.links.repo && (
        <Link href={item.links.repo} target="_blank">
          <p className="text-start font-light text-lime-700 dark:text-lime-300 hover:text-gray-700 hover:dark:text-gray-300 flex items-center gap-1">
            <RiGithubFill />
            Repo
          </p>
        </Link>
      )}
    </>
  );
};

export default PortfolioContentItem;
