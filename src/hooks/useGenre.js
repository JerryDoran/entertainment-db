const useGenres = (selectedGenres) => {
  if (selectedGenres.length < 1) {
    return "";
  }

  const genreIds = selectedGenres.map((genre) => genre.id);

  // returns amount of each genre
  return genreIds.reduce((acc, currentValue) => acc + "," + currentValue);
};

export default useGenres;
