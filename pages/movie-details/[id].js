import React, { Component, useEffect, useContext, useState } from 'react';
//import { Link } from 'react-router-dom';
import Link from "next/link"
import {numberWithCommas, getRandomInArray, parseDateMoment, isObjectEmpty} from "../../utils";
import MovieList from "../../components/movies/MovieList";
import RateMovieModal from "../../components/movies/RateMovieModal";
import { Space } from 'antd';
import {addWatchLater, deleteWatchLater, getWatchLaterByCustomerIDAndMovieID, getAllMoviesAxios, addView, getReviewByMovieIDAxios, getMovieByIDAxios} from "../../requests";
import {authenticationService} from '../../_services';
import { DiscussionEmbed } from 'disqus-react';

import {ReviewContext} from '../../reducers/hookReducers/ReviewStore';
import {GET_REVIEWS_BY_MOVIES_ID} from '../../reducers/hookReducers/types';

export const getStaticProps = async (context) => {
    const movieID = context.params.id;
    const movies = await getAllMoviesAxios();
    const movie = await getMovieByIDAxios(movieID);
    const rates = await getReviewByMovieIDAxios(movieID);
    
    return {
      props: { movies, movieItem: movie, rates, movieID }
    }
  }

  export const getStaticPaths = async () => {
    const movies = await getAllMoviesAxios();

    // map data to an array of path objects with params (id)
    const paths = movies.map(movie => {
        return {
            params: {
                id: movie._id.toString()
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

function MovieDetails({movies, movieItem, rates, movieID}) {

    const [reviewState, reviewDispatch] = useContext(ReviewContext);

    const [randomMovies, setRandomMovies] = useState([]);
    const [liked, setLike] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await addView(movieID);

            reviewDispatch({
                type: GET_REVIEWS_BY_MOVIES_ID,
                payload: {rates}
            })

            let liked = false;
            let loggedIn = false;
        
            const currentUser = authenticationService.currentUserValue;

            if (currentUser) {
                loggedIn = true;
                let customerID = currentUser._id;

                const watchLaterItem = await getWatchLaterByCustomerIDAndMovieID(customerID, movieID);

                if (!watchLaterItem || isObjectEmpty(watchLaterItem)) {
                    liked = false;
                } else {
                    liked = true;
                }
            }

            const randomMovies = getRandomInArray(movies, 6);

            setRandomMovies(randomMovies);
            setLike(liked);
            setLoggedIn(loggedIn);
            setLoading(false);
        })()
    }, []);

    const changeLikeStatus = async () => {
        const currentUser = authenticationService.currentUserValue;
        if (currentUser) {
            let customerID = currentUser._id;
            if (!liked === true) {
                await addWatchLater(customerID, movieID)
            } else {
                await deleteWatchLater(customerID, movieID)
            }
        }

        setLike(prevLike => !prevLike);
    }

    const calculateRating = () => {
        const reviews = reviewState.reviews;

        if (!loading && reviews) {
            if (reviews.length > 0) {
                let meanRating = 0;

                for (let i = 0; i < reviews.length; i++) {
                    const reviewItem = reviews[i];
                    console.log(reviews);
                    meanRating += reviewItem.rate;
                }
    
                if (reviews.length && reviews.length > 0) {
                    meanRating = meanRating / reviews.length;
                }
                return meanRating;
            }
        }

        return 0;
    }

    const renderLikeButton = () => {
        if (loading) {
            return (
                <></>
            )
        }

        if (loggedIn) {
            return (
            <div className="util-btn like-btn" onClick={changeLikeStatus}>
                 <div className="icon">
                     <span class="material-icons">
                         favorite
                     </span>
                 </div>
                 <p>{liked ? "Remove from Watch Later" : "Add to Watch Later"}</p>
             </div>
            )
        }
    }

    const renderRatingButton = () => {
        if (loading) {
            return (
                <></>
            )
        }

        const movieID = movieItem._id;

        if (loggedIn) {
            return (
                <RateMovieModal movieID={movieID}/>
            )
        }
    }

    const renderGenreList = () => {
        const {genres} = movieItem;
        let genreContent = <></>;

        if (!genres || genres.length === 0) {
            return genreContent;
        }
        
        genreContent = genres.map(genreItem => {
            return <Link href={`/search?g=${genreItem}`} key={genreItem}>
                <a className="search-genre-item genre-box-item">
                    {genreItem}
                </a>
            </Link>
        })

        return <Space size={[16, 16]} wrap key={"genreContent"}>
            {genreContent}
        </Space>
    }

    const renderActorList = () => {
        const {IMDBOject} = movieItem;

        let {Actors} = IMDBOject;

        Actors = Actors.split(", ");

        return Actors.map(Actor => {
            return (
                <Link href={`/search?t=${Actor}`} key={Actor}>
                    <a>
                        {Actor}
                    </a>
                </Link>
            )
        })
    }

    const renderDirectorList = () => {
        const {IMDBOject} = movieItem;

        let {Director} = IMDBOject;

        Director = Director.split(", ");

        return Director.map(directorItem => {
            return (
                <Link href={`/search?t=${directorItem}`} key={directorItem}>
                    <a>
                        {directorItem}
                    </a>
                </Link>
            )
        })
    }

    const renderMovieDetailsContent = () => {
        if (loading || !movieItem) {
            return (
                <div className="movie-details-page">
                    <div className="container-fluid">

                    </div>
                </div>
            )
        }

        const {name, created_date, imageURL, view, rating, streamTapeCode, IMDBOject, _id} = movieItem;

        let {Awards, Plot, Released, imdbRating, imdbVotes, BoxOffice} = IMDBOject;

        return (
            <div className="movie-details-page">
                <div className="container-fluid">
                    <div className="row">

                    <div className="movie-details-main">

                        <div className="movie-details-main__video">
                            <iframe id="video-frame" src={streamTapeCode ? `https://streamtape.com/e/${streamTapeCode}/` : `https://streamtape.com/e/Y10JVZQ4Wruv4lD/`} width="100%" height="500" allowFullScreen allowtransparency={true.toString()} allow="autoplay" scrolling="no" frameBorder="0" title={name}></iframe>
                            <div className="title">
                                <h4>{name}</h4>
                            </div>
                            <div className="title_rating">
                                    <Space>
                                        <span class="material-icons">
                                            star_rate
                                        </span>
                                        <p>{calculateRating().toFixed(1)}/5</p>
                                    </Space>
                                </div>
                            <p>{numberWithCommas(view)} views</p>

                            {loggedIn ? (<div className="movie-details-main-video__utils">
                                <Space>
                                    {renderRatingButton()}
                                    {renderLikeButton()}
                                </Space>
                            </div>) : (<div style={{
                                marginBottom: "20px"
                            }}></div>)}
                            
                        </div>

                        <div className="movie-details-main__description">
                            <div className="movie-details-main-description__poster">
                                <img src={imageURL} alt={name} className="img-fluid"/>
                            </div>

                            <div className="movie-details-main-description__details">

                                <ul className="movie-details-main-description-details__item">
                                    <div className="row">
                                        <li style={{
                                            flex: "100%",
                                            maxWidth: "100%"
                                        }}>
                                            <h5>Actors</h5>
                                            <p className=" movie-description-details-list">
                                                {renderActorList()}
                                            </p>
                                        </li>
                                    </div>
                                </ul>

                                <ul className="movie-details-main-description-details__item">
                                    <div className="row">
                                        <li>
                                            <h5>IMDB Rating</h5>
                                            <p><span className="text-color-primary">{imdbRating}</span>/10 ({imdbVotes} votes)</p>
                                        </li>
                                        <li>
                                            <h5>Box Office</h5>
                                            <p>{BoxOffice}</p>
                                        </li>
                                    </div>
                                </ul>

                                <ul className="movie-details-main-description-details__item">
                                    <div className="row">
                                        <li>
                                            <h5>Release Date</h5>
                                            <p>{Released}</p>
                                        </li>
                                        <li>
                                            <h5>Uploaded Date</h5>
                                            <p>{parseDateMoment(created_date)}</p>
                                        </li>
                                    </div>
                                </ul>

                                <ul className="movie-details-main-description-details__item">
                                    <div className="row">
                                        <li>
                                            <h5>Directors</h5>
                                            <p className="movie-description-details-list">
                                                    {renderDirectorList()}
                                            </p>
                                        </li>
                                        <li>
                                            <h5>Awards</h5>
                                            <p>{Awards}</p>
                                        </li>
                                    </div>
                                </ul>

                            </div>
                        </div>

                        <div className="movie-details-main__info">
                            <div className="movie-details-main-info__genre-box-list">
                                {renderGenreList()}
                            </div>

                            <div className="movie-details-main-info__plot">
                                <p>
                                    {Plot}
                                </p>
                            </div>

                            <div className="movie-details-main-info__comment">
                            <DiscussionEmbed
                                shortname="https-movie-go-netlify-app"
                                config={
                                    {
                                        url: `https://movie-go.netlify.app/${streamTapeCode}`,
                                        identifier: streamTapeCode,
                                        title: `https://movie-go.netlify.app/${streamTapeCode}`,
                                        language: 'en_UK'	
                                    }
                                }
                            />
                            </div>
                        </div>
                    </div>

                    <div className="movie-details-side">
                        <h4>Watch more...</h4>
                        <MovieList movieList={randomMovies}/>
                    </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {renderMovieDetailsContent()}
        </div>
    )
}

export default MovieDetails;