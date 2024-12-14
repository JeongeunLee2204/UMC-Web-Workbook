import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios-instance";
import styled from "styled-components";

const fetchMovie = async (movieID) => {
  const response = await axiosInstance.get(`/movie/${movieID}?language=ko-KR`);
  return response.data;
};

const MovieInfo = () => {
  const { movieID } = useParams();

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie", movieID], // 단일 객체로 전달
    queryFn: () => fetchMovie(movieID),
  });

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (isError) {
    return <ErrorMessage>에러가 발생했습니다: {error.message}</ErrorMessage>;
  }

  return (
    <Container>
      <h1>{movie.title}</h1>
      <p>평점: {movie.vote_average}</p>
      <p>개봉일: {movie.release_date}</p>
      <p>{movie.overview}</p>
    </Container>
  );
};

export default MovieInfo;

const Container = styled.div`
  padding: 20px;
  color: white;
  background-color: #121212;
  border-radius: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1.2rem;
`;
