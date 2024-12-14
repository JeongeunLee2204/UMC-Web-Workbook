import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "./pages/movies/fetchMovies";

const Outlet = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["featuredMovies"],
    queryFn: () => fetchMovies({ endpoint: "now_playing" }),
  });

  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) {
    return (
      <Loader>
        <p>로딩 중...</p>
      </Loader>
    );
  }

  if (isError) {
    return (
      <ErrorMessage>
        에러가 발생했습니다: {error.message}
      </ErrorMessage>
    );
  }

  const movies = data.results.slice(0, 10); // 최대 10개의 영화만 표시
  const featuredMovie = movies[currentIndex];
  const imageUrl = `https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path}`;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container>
      <BackgroundImage src={imageUrl} alt={featuredMovie.title} />
      <Overlay>
        <ArrowButton onClick={handlePrevious} direction="left">
          &#9664;
        </ArrowButton>
        <MovieInfo>
          <Title>{featuredMovie.title}</Title>
          <Description>{featuredMovie.overview}</Description>
          <MoreInfoButton onClick={() => navigate(`/movies/${featuredMovie.id}`)}>
  더 알아보기
</MoreInfoButton>

        </MovieInfo>
        <ArrowButton onClick={handleNext} direction="right">
          &#9654;
        </ArrowButton>
      </Overlay>
    </Container>
  );
};

export default Outlet;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  color: white;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(70%);
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 20px;
  box-sizing: border-box;
`;

const MovieInfo = styled.div`
  max-width: 600px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
  line-height: 1.5em;
`;

const MoreInfoButton = styled.button`
  padding: 10px 20px;
  background-color: #e50914;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #b20710;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.direction === "left" ? "left: 10px;" : "right: 10px;")}
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2em;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2em;
  text-align: center;
  margin-top: 20px;
`;
