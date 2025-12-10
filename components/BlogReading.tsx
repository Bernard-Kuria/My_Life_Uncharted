import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutputBlock from "./DraftifyProComponents/OutputBlock";
import Tooltip from "./DraftifyProComponents/Tooltip";

import { BlogContent, Blog } from "@lib/types/types";

export default function BlogArea({
  blogContent,
  isMetaLoading,
  isContentLoading,
  blog,
  liked,
  bounce,
  triggerBounce,
  handleLikeClick,
  handleShare,
}: {
  blogContent: BlogContent | undefined;
  isMetaLoading: boolean;
  isContentLoading: boolean;
  blog: Blog | undefined;
  liked: boolean;
  bounce: boolean;
  triggerBounce: () => void;
  handleLikeClick: () => void;
  handleShare: () => void;
}) {
  if (isMetaLoading && isContentLoading) return <div>Loading Blog...</div>;

  return (
    <div className="flex flex-col gap-5 min-h-[1170px] h-fit py-10 px-5 lg:p-[100px] bg-white dark:bg-black blog-text">
      <div className="flex detail-text">
        <div className="flex-1 flex gap-[30px]">
          <div>{blog?.blogMeta.dateCreated}</div>
          <div>{blog?.blogMeta.minsRead} min read</div>
        </div>
        <div className="flex gap-2.5 items-center cursor-pointer">
          <Tooltip text="Copy link to share">
            <FontAwesomeIcon
              className="icon-size"
              icon={["fas", "share-nodes"]}
              onClick={handleShare}
            />
          </Tooltip>
        </div>
      </div>

      {blogContent ? (
        <div className="flex-1 flex flex-col gap-3">
          <OutputBlock blocksData={blogContent.blogContent} />
        </div>
      ) : (
        <div>No blog data</div>
      )}

      <div className="flex detail-text">
        <div className="flex gap-[30px]">
          <div>
            <strong>{blog?.blogMeta.views}</strong> views
          </div>
          <div>
            <strong>{blog?.blogMeta.comments}</strong> comments
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-2.5 items-center">
          <strong>{blog?.blogMeta.likes}</strong>
          <FontAwesomeIcon
            className={`icon-size cursor-pointer ${
              bounce ? "like-bounce" : ""
            } ${liked ? "text-(--secondary-blue)" : "text-foreground"}`}
            icon={["far", "heart"]}
            onClick={() => {
              triggerBounce();
              handleLikeClick();
            }}
          />
        </div>
      </div>
    </div>
  );
}
