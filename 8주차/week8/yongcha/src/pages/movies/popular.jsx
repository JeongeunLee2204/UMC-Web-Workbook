import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "./card.jsx";
import { fetchMovies } from "./fetchMovies";
import { useState } from "react";

const Popular = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["popularMovies", currentPage],
    queryFn: () => fetchMovies({ pageParam: currentPage, endpoint: "popular" }),
    keepPreviousData: true,
  });

  const handlePageChange = (direction) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <SkeletonContainer>
        {Array.from({ length: 12 }).map((_, index) => (
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
    <Container>
      <CardList>
        {data.results.map((movie) => (
          <CardWrapper key={movie.id}>
            <Card movie={movie} />
          </CardWrapper>
        ))}
      </CardList>
      <PaginationControls>
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => handlePageChange("prev")}
        >
          이전
        </PaginationButton>
        <PaginationInfo>{currentPage}페이지</PaginationInfo>
        <PaginationButton
          disabled={data?.totalPages && currentPage === data.totalPages}
          onClick={() => handlePageChange("next")}
        >
          다음
        </PaginationButton>
      </PaginationControls>
    </Container>
  );
};

export default Popular;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #121212;
  color: white;
  min-height: 100vh;
  padding: 20px 20px 40px;
`;

const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 100px auto 0;
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
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto 0;
  box-sizing: border-box;
`;

const CardWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2em;
  text-align: center;
  margin-top: 20px;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  max-width: 200px;

  margin: 20px 0;
`;

const PaginationButton = styled.button`
  padding: 10px 15px;
  font-size: 1em;
  color: ${(props) => (props.disabled ? "#aaa" : "#fff")};
  background-color: ${(props) => (props.disabled ? "#333" : "#ff007f")};
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#333" : "#e00073")};
  }
`;

const PaginationInfo = styled.span`
  color: #fff;
  font-size: 1.1em;
`;
