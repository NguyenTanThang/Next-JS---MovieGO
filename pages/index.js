import React from 'react';
import {movieHeaderList} from "../helpers";
import {getAllMoviesRecAxios} from "../requests";
import MovieList from "../components/movies/MovieListSlider";
import Layout from "../components/partials/Layout";

export const getStaticProps = async () => {
  const recSections = await getAllMoviesRecAxios();

  return {
    props: { recSections }
  }
}

function Home({recSections}) {

    const renderMovieListSliders = () => {
        let content = [];

        for (let index = 0; index < recSections.length; index++) {
            content.push(
                <div className="home-movie-slider" key={movieHeaderList[index].title}>
                    <MovieList movieList={recSections[index]} headerDetails={movieHeaderList[index]}/>
                </div>
            )
        }

        return content;
    }

    return (
        <div className="home-page">
            <div className="banner">
                <div className="banner-content">
                    <h1>
                        Watch <span className="text-color-primary">Free</span> HD Movies
                    </h1>
                    <h2>
                        Enjoy your <span className="text-color-primary">unlimited</span> movies collection. We are the definitive source for the best curated 720p / 1080p HD movies, viewable by mobile phone and tablet, for free.
                    </h2>
                </div>
            </div>
            {renderMovieListSliders()}
        </div>
    )
}

export default Home;