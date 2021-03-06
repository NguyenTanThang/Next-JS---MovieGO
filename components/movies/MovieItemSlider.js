import React from 'react';
//import { Link } from 'react-router-dom';
import Link from 'next/link';
import {numberWithCommas, getDaysDiff} from "../../utils";

function MovieItemSlider({movieItem}) {

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
        <div className="movie-item-slider">
            {newTag}
            <Link href={`/movie-details/${_id}`}>
                <a>
                    <div className="movie-item__poster">
                            <img src={imageURL} alt={name} className="img-fluid"/>
                    </div>
                </a>
            </Link>
            <div className="movie-item__info">
                <a>
                    <Link href={`/movie-details/${_id}`}>
                        <h6>{name}</h6>
                    </Link>
                </a>
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

/*
class MovieItem extends Component {
    render() {
        const {movieItem} = this.props;
        const {created_date, name, imageURL, view, rating, _id} = movieItem;

        let newTag = <></>;

        console.log(getDaysDiff(created_date));

        if (getDaysDiff(created_date) <= 14 && getDaysDiff(created_date) >= 0) {
            newTag = (
                <div className="movie-item__new-tag">
                    NEW
                </div>
            );
        }

        return (
            <div className="movie-item-slider">
                {newTag}
                <Link to={`/movie-details/${_id}`}>
                    <div className="movie-item__poster">
                            <img src={imageURL} alt={name} className="img-fluid"/>
                    </div>
                </Link>
                <div className="movie-item__info">
                    <Link to={`/movie-details/${_id}`}>
                        <h6>{name}</h6>
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
}
*/

export default MovieItemSlider;
