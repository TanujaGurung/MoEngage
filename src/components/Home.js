import React from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./Details";

export default class Home extends React.Component {
  state = {
    search: "",
    data: [],
    selectedId: 0,
  };
  componentDidMount() {
    this.fetchApi();
  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.selectedId !== this.state.selectedId) {
  //     this.changeSelectedAnime(id);
  //   }
  // }
  // 3f80fbc0-be7e-4833-b796-e3c6e62371c1
  changeSelectedAnime = (id) => {
    this.setState({ selectedId: id });
    // console.log(this.state.selectedId);
  };
  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ search: e.target.value });
    //alert("hi");
  };

  fetchApi = async () => {
    await axios
      .get("https://api.aniapi.com/v1/random/anime/100")
      .then((res) => {
        this.setState({ data: res.data.data.slice(0, 30) });
        console.log(this.state.data);
      });
  };

  render() {
    const { data, search } = this.state;
    console.log(search);

    return (
      <BrowserRouter>
        <Navbar search={search} handleSearch={this.handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <div id="cards_landscape_wrap-2">
                <div class="container-fluid">
                  <div class="row">
                    {data.length ? (
                      data
                        .filter((val) => {
                          if (search == "") {
                            return val;
                          } else if (
                            val.titles.en
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            val.descriptions.en
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return val;
                          }
                        })
                        .map((list) => (
                          <Card
                            key={list.anilist_id}
                            genres={list.genres[0]}
                            image={list.cover_image}
                            title={list.titles}
                            episodesCount={list.episodes_count}
                            description={list.description}
                            trailer_url={list.trailer_url}
                            season_year={list.season_year}
                            banner_image={list.banner_image}
                            cover_color={list.cover_color}
                            id={list.id}
                            changeSelectedAnime={this.changeSelectedAnime}
                          />
                        ))
                    ) : (
                      <div>Loading... </div>
                    )}
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/details"
            element={<Details id={this.state.selectedId} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}
