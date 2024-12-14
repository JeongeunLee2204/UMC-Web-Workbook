import { useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "./card.jsx";
import { fetchMovies } from "./fetchMovies";
import { useNavigate } from "react-router-dom";

const NowPlaying = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["nowPlayingMovies"],
      queryFn: ({ pageParam = 1 }) =>
        fetchMovies({ pageParam, endpoint: "now_playing" }),
      getNextPageParam: (lastPage) =>
        lastPage.nextPage <= lastPage.totalPages
          ? lastPage.nextPage
          : undefined,
    });

  if (isLoading) {
    return (
      <SkeletonContainer>
        {Array.from({ length: 6 * 3 }).map((_, index) => (
          <SkeletonCard key={index}>
            <Skeleton variant="rectangular" width={200} height={300} />
            <Skeleton variant="text" width={150} />
          </SkeletonCard>
        ))}
      </SkeletonContainer>
    );
  }

  if (isError) {
    return <ErrorMessage>에러가 발생했습니다: {error.message}</ErrorMessage>;
  }

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={data.pages.flatMap((page) => page.results).length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={
          <LoadingSpinner>
            <CircularProgress />
          </LoadingSpinner>
        }
        style={{ overflow: "hidden" }}
      >
        <CardList>
          {data.pages.flatMap((page) =>
            page.results.map((movie) => (
              <CardWrapper
                key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <Card movie={movie} />
              </CardWrapper>
            ))
          )}
        </CardList>
      </InfiniteScroll>
    </Wrapper>
  );
};

export default NowPlaying;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #121212;
`;

const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 한 행에 6개 고정 */
  gap: 20px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 한 행에 6개 고정 */
  gap: 20px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const CardWrapper = styled.div`
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2em;
  text-align: center;
  margin-top: 20px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
