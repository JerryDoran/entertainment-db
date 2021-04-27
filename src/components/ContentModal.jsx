import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import { unavailable, img_500, unavailableLandscape } from "../config/config";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import "../../styles/content-modal.css";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 3, 3)
  }
}));

export default function ContentModal({ children, media, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [video, setVideo] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideoData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    console.log(data);

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideoData();
  }, []);

  return (
    <>
      <div type="button" onClick={handleOpen} className="media">
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="content-modal">
                <img
                  className="content-modal_portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                />
                <img
                  className="content-modal_landscape"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                />
                <div className="content-modal_about">
                  <span className="content-modal_title">
                    {content.name || content.title}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "_____"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="content-modal_description">
                    {content.overview}
                  </span>
                  <div>
                    <Carousel media={media} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}