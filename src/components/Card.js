import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <React.Fragment>
      <div class="col-xs-12 col-sm-6 col-md-3 col-lg-2">
        <a href="">
          <div
            class="card-flyer"
            onClick={() => {
              props.changeSelectedAnime(props.id);
            }}
          >
            <div class="text-box">
              <div class="image-box">
                <Link
                  to={{
                    pathname: "/details",
                    state: {
                      genres: props.genres,
                      image: props.image,
                      title: props.title,
                      episodesCount: props.episodesCount,
                      description: props.description,
                      trailer_url: props.trailer_url,
                      season_year: props.season_year,
                      banner_image: props.banner_image,
                      cover_color: props.cover_color,
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={props.image}
                    alt=""
                    style={{ backgroundColor: `$(props.cover_color)` }}
                  />
                </Link>
              </div>
              <div class="text-container">
                <h6
                  style={{
                    display: "block" /* Fallback for non-webkit */,
                    display: "-webkit-box",
                    height:
                      "2.6em" /* Fallback for non-webkit, line-height * 2 */,
                    lineHeight: "1.3em",
                    webkitLineClamp:
                      "2" /* if you change this, make sure to change the fallback line-height and height */,
                    webkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {props.title.en}
                  {props.title.jp}
                </h6>
                <p>Type:{props.genres}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </React.Fragment>
  );
};
export default Card;
