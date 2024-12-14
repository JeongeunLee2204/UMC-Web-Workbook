import axios from "axios";

const API_URL =
  import.meta.env.VITE_MOVIE_API_URL || "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async ({ pageParam = 1, endpoint }) => {
  if (!API_TOKEN || !API_URL) {
    throw new Error(
      "API_URL 또는 API_TOKEN이 설정되지 않았습니다. .env 파일을 확인하세요."
    );
  }

  try {
    const response = await axios.get(`${API_URL}/movie/${endpoint}`, {
      params: {
        language: "ko-KR",
        page: pageParam,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    const { results, total_pages: totalPages } = response.data;

    return {
      results,
      nextPage: pageParam + 1,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    throw new Error("영화 데이터를 불러오는 중 오류가 발생했습니다.");
  }
};
