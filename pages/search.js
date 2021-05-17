import React, { Component, useState, useEffect } from 'react';
import MovieList from "../components/movies/MovieList";
import Pagination from "../components/partials/Pagination";
import {paginate, sortMoviesAndSeries, extractQueryString} from "../utils";
import SearchEngine from "../components/partials/SearchEngine";
/*
import {movieData} from "../data";
import {connect} from "react-redux";
import {getAllMovies} from "../actions/movieActions";
import {getAllGenres} from "../actions/genreActions";
*/
import {getAllMoviesAxios, getAllGenresAxios} from "../requests";
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
    let genres = await getAllGenresAxios();
    let masterMovies = await getAllMoviesAxios();
  
    return {
      props: { genres, masterMovies }
    }
  }

function Search({ genres, masterMovies }) {

    const router = useRouter()

    const [searchObject, setSearchObjectNA] = useState({
        searchName: "",
        orderBy: "AtoZ",
        sortGenres: [],
        boardMatches: false
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [pageObject, setPageObject] = useState({});
    const searchQuery = router.query;

    const changePageNumber = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const setSearchObject = (searchObject) => {
        setSearchObjectNA(prevSearchObject => {
            return {
                ...prevSearchObject,
                ...searchObject
            }
        })
        setCurrentPage(1);
    }

    const clearSearchObject = () => {
        setSearchObjectNA({
            searchName: "",
            orderBy: "AtoZ",
            sortGenres: [],
            boardMatches: false
        })
        setCurrentPage(1);
    }

    useEffect(() => {
        (async () => {
            let searchObjectMockup = searchObject;

            const {t, g, s} = searchQuery;

            if (t) {
                searchObjectMockup = {
                    ...searchObjectMockup,
                    searchName: t
                }
            }

            if (g) {
                searchObjectMockup = {
                    ...searchObjectMockup,
                    sortGenres: [g]
                }
            }

            if (s) {
                searchObjectMockup = {
                    ...searchObjectMockup,
                    orderBy: s
                }
            }

            let currentMovieData = masterMovies;
            currentMovieData = sortMoviesAndSeries(currentMovieData, searchObjectMockup);
            const pageObjectLocal = paginate(currentMovieData.length, currentPage, 15, 6);
            currentMovieData = currentMovieData.slice(pageObjectLocal.startIndex, pageObjectLocal.endIndex + 1);

            setPageObject(prevPageObject => {
                return {
                    ...prevPageObject,
                    ...pageObjectLocal
                }
            })
            setMovies(currentMovieData);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            let moviesLocal = masterMovies;

            let currentMovieData = sortMoviesAndSeries(moviesLocal, searchObject);
    
            const pageObjectLocal = paginate(currentMovieData.length, currentPage, 15, 6);
            currentMovieData = currentMovieData.slice(pageObjectLocal.startIndex, pageObjectLocal.endIndex + 1);
    
            setPageObject(prevPageObject => {
                return {
                    ...prevPageObject,
                    ...pageObjectLocal
                }
            })
            setMovies(currentMovieData);
        })()
    }, [currentPage, searchObject]);

    return (
        <div className='search-page'>
            <SearchEngine searchQuery={searchQuery} setSearchObject={setSearchObject} clearSearchObject={clearSearchObject} searchObject={searchObject} genres={genres}/>
            <Pagination pageObject={pageObject} pageSizeDefault={15} onChangePageNumber={changePageNumber}/>
            <div style={{marginBottom: "20px"}}></div>
            <MovieList movieList={movies}/>
            <Pagination pageObject={pageObject} pageSizeDefault={15}onChangePageNumber={changePageNumber}/>
            <div style={{paddingBottom: "20px"}}></div>
        </div>
    )
}

export default Search;