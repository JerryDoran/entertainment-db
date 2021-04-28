import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../components/CustomPagination";
import Genre from "../components/Genres";
import SingleContent from "../components/SingleContent";
import useGenres from "../hooks/useGenre";
import "../globals.css";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    // console.log(data);

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);

  return (
    <div>
      <span className="page-title">Movies</span>
      <Genre
        type="movie"
        selectedGenres={selectedGenres}
        genres={genres}
        setGenres={setGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((result) => {
            return (
              <SingleContent
                key={result.id}
                id={result.id}
                poster={result.poster_path}
                title={result.title || result.name}
                date={result.first_air_date || result.release_date}
                media={result.media_type}
                voteAverage={result.vote_average}
              />
            );
          })}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
