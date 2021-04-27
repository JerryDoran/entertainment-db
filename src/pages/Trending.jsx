import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../components/SingleContent";
import "../../styles/trending.css";
import CustomPagination from "../components/CustomPagination";

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    // console.log(data);

    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="page-title">Trending</span>
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
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
