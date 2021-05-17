import React, { useEffect, useState } from 'react';
import MovieList from "../components/movies/MovieList";
import Pagination from "../components/partials/Pagination";
import {getWatchLaterByCustomerID} from "../requests";
import {paginate} from "../utils";
import { authenticationService } from '../_services';

export const getStaticProps = async () => {
    const currentUser = authenticationService.currentUserValue;
    const masterMovies = getWatchLaterByCustomerID(currentUser._id);
  
    return {
      props: { masterMovies }
    }
  }

function WatchLater({masterMovies}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [pageObject, setPageObject] = useState({})

    useEffect(() => {
        const movies = masterMovies

        const pageObjectLocal = paginate(movies.length, currentPage, 15, 6);
        let currentMovieData = movies.slice(pageObjectLocal.startIndex, pageObjectLocal.endIndex + 1);

        setPageObject(prevPageObject => {
            return {
                ...prevPageObject,
                ...pageObjectLocal
            }
        })
        
        setMovies(currentMovieData);
    }, [currentPage]);

    const changePageNumber = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className='watch-later-page search-page'>
            <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber} pageSizeDefault={15}/>
            <div style={{marginBottom: "20px"}}></div>
            <MovieList movieList={movies}/>
            <Pagination pageObject={pageObject} onChangePageNumber={changePageNumber} pageSizeDefault={15}/>
            <div style={{paddingBottom: "20px"}}></div>
        </div>
    )
}

export default WatchLater;
