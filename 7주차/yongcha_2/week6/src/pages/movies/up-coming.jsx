import { useInfiniteQuery } from "@tanstack/react-query";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "./card.jsx";
import { fetchMovies } from "./fetchMovies";
const UpComing = () => {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["upcomingMovies"],
      queryFn: ({ pageParam = 1 }) =>
        fetchMovies({ pageParam, endpoint: "upcoming" }),
      getNextPageParam: (lastPage) =>
        lastPage.nextPage <= lastPage.totalPages
          ? lastPage.nextPage
          : undefined,
    });

  if (isLoading) {
    return (
      <SkeletonContainer>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index}>
            <Skeleton variant="rectangular" width={150} height={225} />
            <Skeleton variant="text" width={100} />
          </SkeletonCard>
        ))}
      </SkeletonContainer>
    );
  }

  if (isError) {
    return <ErrorMessage>에러가 발생했습니다: {error.message}</ErrorMessage>;
  }

  return (
    <InfiniteScroll
      dataLength={data.pages.flatMap((page) => page.results).length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <LoadingSpinner>
          <CircularProgress />
        </LoadingSpinner>
      }
    >
      <CardList>
        {data.pages.flatMap((page) =>
          page.results.map((movie) => <Card key={movie.id} movie={movie} />)
        )}
      </CardList>
    </InfiniteScroll>
  );
};

export default UpComing;

const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 7px;
  padding: 20px;
  background-color: #121212;
`;

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 7px;
  padding: 20px;
  background-color: #121212;
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
