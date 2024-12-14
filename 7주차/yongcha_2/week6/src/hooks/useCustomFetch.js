import axios from "axios";

export const fetchMovies = async ({ pageParam = 1, endpoint }) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${pageParam}`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmRmYjljOTIyMzdhY2MwYmNhYWI0ZWU5YjQ3N2YwNiIsIm5iZiI6MTcyODY2MTU1My45OTE0ODYsInN1YiI6IjY3MDkxOGVkMjY1YTVmOGJjNTcwYjY3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f3bmgGaGA5iwRiNdtYqLeBWYq8aiQGxYRf0hB50CQis`,
      },
    }
  );
  return {
    results: response.data.results,
    nextPage: pageParam + 1,
    totalPages: response.data.total_pages,
  };
};
