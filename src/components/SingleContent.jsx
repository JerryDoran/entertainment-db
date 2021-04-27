import { Badge } from "@material-ui/core";
import "../styles/single-content.css";
import { img_300, unavailable } from "../config/config";
import ContentModal from "./ContentModal";

const SingleContent = ({ id, poster, title, date, media, voteAverage }) => {
  return (
    <ContentModal media={media} id={id}>
      <Badge
        badgeContent={voteAverage}
        color={voteAverage > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <h5 className="title">{title}</h5>
      <span className="sub-title">
        {media === "tv" ? "TV Series" : "Movie"}
        <span className="sub-title">{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
