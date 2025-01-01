import { useInfiniteQuery } from "@tanstack/react-query";
import { ImSpoonKnife } from "@react-icons/all-files/im/ImSpoonKnife";

import { SubjectBox } from "shared/ui/subjectBox";
import { RankItem, RankItemSkeleton } from "shared/ui/rankItem";
import { useIntersectionObserver } from "shared/hooks/useIntersectionObserver";
import { UserQueries } from "entities/user";

import styles from "./makerRankPage.module.scss";

export const MakerRankPage = () => {
  const skeletonCount = 3 + Math.floor(Math.random() * 3);
  const {
    data: recipeMakerRank,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(UserQueries.InfiniteRecipeMakerRankQuery());

  const { setTarget } = useIntersectionObserver({
    options: { rootMargin: "300px" },
    hasNextPage,
    fetchNextPage,
  });

  return (
    <SubjectBox
      title="레시피를 가장 많이 만든 유저"
      className={styles.container}
    >
      {recipeMakerRank?.pages.map((page, pageIndex) =>
        page.map(({ _id, recipe_count, author }, index) => (
          <RankItem
            key={_id}
            to={`/user/${author.name}`}
            picture={author.picture}
            title={author.name}
            rank={index + pageIndex}
          >
            <div className={styles.aggregate}>
              <ImSpoonKnife />
              {recipe_count}
            </div>
          </RankItem>
        ))
      )}
      {isFetching &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <RankItemSkeleton key={i} rank={i} />
        ))}
      <div id="observer" ref={setTarget} style={{ minHeight: "4em" }}></div>
    </SubjectBox>
  );
};