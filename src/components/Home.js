import React from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./Details";

export default class Home extends React.Component {
  state = {
    search: "",
    input: "",
    data: [],
    selectedId: 0,
    currentPage: 1,
    totalPage: 1,
  };
  componentDidMount() {
    this.fetchApi();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchApi();
    }
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchApi();
    }
  }
  // 3f80fbc0-be7e-4833-b796-e3c6e62371c1

  changeSelectedAnime = (id) => {
    this.setState({ selectedId: id });
    // console.log(this.state.selectedId);
  };
  handleInput = (e) => {
    e.preventDefault();
    this.setState({ input: e.target.value });
    //alert("hi");
  };
  handleSearch = () => {
    this.setState({ search: this.state.input });
    //alert("hi");
  };
  changePage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  fetchApi = async () => {
    if (this.state.search === "") {
      await axios
        .get(
          `https://api.aniapi.com/v1/anime?page=${this.state.currentPage}&per_page=30`
        )
        .then((res) => {
          this.setState({ data: res.data.data.documents });
          this.setState({ totalPage: res.data.data.last_page });
          console.log(this.state.data);
        });
    } else {
      await axios
        .get("https://api.aniapi.com/v1/anime?title=" + this.state.search)
        .then((res) => {
          this.setState({ data: res.data.data.documents });
          console.log(this.state.data);
        });
    }
  };

  render() {
    const { data, search } = this.state;
    //console.log(search);

    return (
      <BrowserRouter>
        <Navbar
          search={search}
          handleSearch={this.handleSearch}
          handleInput={this.handleInput}
          input={this.state.input}
        />
        <Routes>
          <Route
            path="/"
            element={
              <div id="cards_landscape_wrap-2">
                <div class="container-fluid">
                  <div class="row">
                    {data.length ? (
                      data.map((list) => (
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
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <p class="page-link" onClick={this.changePage}>
                      Previous
                    </p>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
