import { PortfolioItem } from "@/types/portfolio";
import Link from "next/link";
import YarnLogo from "../svgs/yarn/YarnLogo";
import YarnHeader from "./YarnHeader";

type PortfolioContentItemProps = {
  item: PortfolioItem[number];
};

const PortfolioContentItem = ({ item }: PortfolioContentItemProps) => {
  return (
    <>
      <Link href={item.href} target="_blank">
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
    </>
  );
};

export default PortfolioContentItem;
