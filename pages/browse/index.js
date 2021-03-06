import React, { useContext, useEffect } from 'react';
import {browseSpecialData} from "../../data";
import GenreListBrowse from "../../components/genres/GenreListBrowse";
//import { Link } from 'react-router-dom';
import Link from "next/link";
import {GenreContext} from '../../reducers/hookReducers/GenreStore';
import {GET_ALL_GENRES} from '../../reducers/hookReducers/types';
import {getAllGenresAxios} from '../../requests';

export const getStaticProps = async () => {
    let genres = await getAllGenresAxios();
  
    return {
      props: { genres }
    }
  }

function Browse({genres}) {

    const [genreState, genreDispatch] = useContext(GenreContext);

    useEffect(() => {
        genreDispatch({type: GET_ALL_GENRES, payload: {
            genres
        }})
    }, []);

    const renderBrowseSpecialSection = () => {
        return browseSpecialData.map(browseSpecialDataItem => {
            const {icon, title, subTitle, backgroundURL, linkTo} = browseSpecialDataItem;

            return (
                <Link href={linkTo}>
                    <a className="browse-special-item">
                        <div className="browse-special-item__image">
                            <img className="img-fluid" src={backgroundURL} alt={title}/>
                        </div>
                        <div className="browse-special-item__content">
                            <div className="icon">
                                {icon}
                            </div>
                            <h4>{title}</h4>
                            <p>{subTitle}</p>
                        </div>
                    </a>
                </Link>
            )
        })
    }

    return (
        <div className="browse-page">
            <div className="browse-special-list">
                <div className="container-fluid">
                    {renderBrowseSpecialSection()}
                </div>
            </div>

            <div className="browse-genres">
                <div className="container-fluid">
                    <div className="section-header">
                        <div className="left">
                            <h2>GENRES</h2>
                        </div>
                    </div>

                    <GenreListBrowse genreList={genreState.genres}/>
                </div>
            </div>
        </div>
    )
}

export default Browse;
