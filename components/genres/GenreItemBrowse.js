import React from 'react'
//import { Link } from 'react-router-dom';
import Link from "next/link";

function GenreItemBrowse({genreItem}) {

    const {numberOfMovies, imageURL, desc, name} =  genreItem;

    return (
        <Link href={`/search?g=${name}`}>
            <a className="browse-genre-item">
                <div className="browse-genre-item__image">
                    <img src={imageURL} className="img-fluid" alt={name} />
                </div>
                <div className="browse-genre-item__content">
                    <h4>{name}</h4>
                    <p>{desc}</p>
                    <div className="footer">
                        <div className="icon">
                            <span class="material-icons">
                                videocam
                            </span>
                        </div>
                        <p>{numberOfMovies}</p>
                    </div>
                </div>
            </a>
        </Link>
    )
}

/*
class GenreItemBrowse extends Component {
    render() {
        const {genreItem} = this.props;
        const {numberOfMovies, imageURL, desc, name} =  genreItem;

        return (
            <Link to={`/search?g=${name}`} className="browse-genre-item">
                    <div className="browse-genre-item__image">
                        <img src={imageURL} className="img-fluid" alt={name} />
                    </div>
                    <div className="browse-genre-item__content">
                        <h4>{name}</h4>
                        <p>{desc}</p>
                        <div className="footer">
                            <div className="icon">
                                <span class="material-icons">
                                    videocam
                                </span>
                            </div>
                            <p>{numberOfMovies}</p>
                        </div>
                    </div>
            </Link>
        )
    }
}
*/

export default GenreItemBrowse;
