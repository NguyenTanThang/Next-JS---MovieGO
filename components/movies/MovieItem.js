import React from 'react';
import {numberWithCommas, getDaysDiff} from "../../utils";
//import { Link } from 'react-router-dom';
import Link from 'next/link';

function MovieItem({movieItem}) {

    const {created_date, name, imageURL, view, rating, _id} = movieItem;

    let newTag = <></>;

    if (getDaysDiff(created_date) <= 14 && getDaysDiff(created_date) >= 0) {
        newTag = (
            <div className="movie-item__new-tag">
                NEW
            </div>
        );
    }

    return (
        <div className="movie-item">
            {newTag}
            <Link href={`/movie-details/${_id}`}>
                <a>
                    <div className="movie-item__poster">
                            <img src={imageURL} alt={name} className="img-fluid"/>
                    </div>
                </a>
            </Link>
            <div className="movie-item__info">
                <Link href={`/movie-details/${_id}`}>
                    <a>
                        <h6>{name}</h6>
                    </a>
                </Link>
                <div className="movie-item-info__view">
                    <div className="icon">
                        <span className="material-icons material-icons-outlined">
                            visibility
                        </span>
                    </div>
                    <p>{numberWithCommas(view)}</p>
                </div>
            </div>
            <div className="movie-item__rating">
                <div className="icon">
                    <span className="material-icons material-icons-outlined">
                        star
                    </span>
                </div>
                <p>{Number.parseFloat(rating).toFixed(1)}</p>
            </div>
        </div>
    )
}

export default MovieItem;
