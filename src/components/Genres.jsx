import { Chip } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";

const Genre = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage
}) => {
  const handleAddedGenres = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemoveGenres = (genre) => {
    const newSelectedGenres = selectedGenres.filter(
      (selected) => selected.id !== genre.id
    );
    setSelectedGenres(newSelectedGenres);
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setGenres(data.genres);
  };

  // console.log(genres);

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres({});
    };
  }, []);

  return (
    <div style={{ padding: "10px 0" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => {
          return (
            <Chip
              label={genre.name}
              style={{ margin: 3 }}
              size="small"
              color="primary"
              key={genre.id}
              clickable
              onDelete={() => handleRemoveGenres(genre)}
            />
          );
        })}
      {genres &&
        genres.map((genre) => {
          return (
            <Chip
              label={genre.name}
              style={{ margin: 3 }}
              size="small"
              key={genre.id}
              clickable
              onClick={() => handleAddedGenres(genre)}
            />
          );
        })}
    </div>
  );
};

export default Genre;
