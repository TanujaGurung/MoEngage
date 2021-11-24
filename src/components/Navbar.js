import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#3366ff" }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          {" "}
          <h3>Anime</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto topnav">
            <li className="nav-item">
              <form class="form-inline my-2 my-lg-0">
                <input
                  class="nav-link"
                  type="search"
                  placeholder="Search Products"
                  aria-label="Search"
                  name="search"
                  value={props.search}
                  onChange={(e) => props.handleSearch(e)}
                ></input>
              </form>
            </li>
            <li className="nav-item">
              <a
                href="https://api.aniapi.com/v1/oauth?response_type=token&client_id=0745e82d-02ae-429f-843e-5bf8c47b3334&redirect_uri=https://anime2222.herokuapp.com/"
                className="nav-link"
                style={{ color: "black", fontSize: "20px" }}
              >
                SignIn{" "}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
