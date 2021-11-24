import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      selectedId: this.props.id,
    };
  }
  componentDidMount() {
    this.fetchlist();
  }
  // componentDidUpdate(prevP, prevS) {
  //   if (prevS.info !== this.state.info) {
  //     this.fetchlist();
  //   }
  // }

  fetchlist = async () => {
    await axios
      .get("https://api.aniapi.com/v1/anime/" + this.state.selectedId)
      .then((res) => {
        this.setState({ info: res.data.data });
      });
  };
  render() {
    const { info } = this.state;
    console.log(info);
    return (
      <div>
        {info.length !== 0 ? (
          <div className="container">
            <br />
            <div className="row">
              <div className="col-md-12">
                <img
                  className="img-fluid"
                  src={info.banner_image || info.cover_image}
                />{" "}
                <h4>{info.titles.en}</h4>
                <h4>{info.titles.jp}</h4>
                <p>{info.descriptions.en}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <h6>Season</h6>
                <h6>No . of season {info.season_period}</h6>
                <h6>Season release year {info.season_year}</h6>
              </div>
              <div className="col-md-4">
                No . of episode {info.episodes_count}
              </div>
              <div className="col-md-4">
                episode Duration {info.episode_duration}
              </div>
            </div>
            <div className="container">
              <h5> Score : {info.score} %</h5>
              {info.trailer_url ? (
                <div>
                  <h5> Watch Trailer</h5>
                  <a target="_blank" href={info.trailer_url}>
                    here
                  </a>
                </div>
              ) : (
                <div></div>
              )}
              <ul className="list-inline">
                <h6> Genres</h6>
                {info.genres.map((item, index) => {
                  return (
                    <li className="list-inline-item">
                      <p className="social-icon text-xs-center">{item} ,</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}
