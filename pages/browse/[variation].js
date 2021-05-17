import React, { useEffect, useState } from 'react';
import MovieList from "../../components/movies/MovieList";
import {getAllMoviesRecAxios} from "../../requests";

export const getStaticProps = async (context) => {
    const variation = context.params.variation;
    const recSections = await getAllMoviesRecAxios();
  
    return {
      props: { recSections, variation }
    }
  }

  export const getStaticPaths = async () => {
    const variations = ["trending", "random"];

    // map data to an array of path objects with params (id)
    const paths = variations.map(variation => {
        return {
            params: {
                variation: variation.toString()
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

function Trending({recSections, variation}) {

    const [content, setContent] = useState(<></>);

    useEffect(() => {
        let movieListContent = <></>;

        if (!recSections) {
            return (
                <div className='watch-later-page search-page'>
                    <div className="browse-genres">
                        {movieListContent}
                    </div>
                </div>
            )
        }

        if (variation === "trending") {
            movieListContent = (
                <div>
                    <div className="section-header" style={{
                            marginLeft: "25px"
                        }}>
                        <div className="left">
                            <h2>TRENDING</h2>
                        </div>
                    </div>

                    <MovieList movieList={recSections[0]}/>
                </div>
            )
        }

        if (variation === "random") {
            movieListContent = (
                <div>
                    <div className="section-header" style={{
                            marginLeft: "25px"
                        }}>
                        <div className="left">
                            <h2>RANDOM</h2>
                        </div>
                    </div>

                    <MovieList movieList={recSections[3]}/>
                </div>
            )
        }

        setContent(movieListContent)
    }, []);

    return (
        <div className='watch-later-page search-page'>
            <div className="browse-genres">
                {content}
            </div>
        </div>
    )
}

export default Trending;
