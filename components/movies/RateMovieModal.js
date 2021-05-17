import React, {Component, useState, useContext, useEffect} from "react";
import { Modal } from 'antd';
import {
  isObjectEmpty
} from "../../utils";
import {
  authenticationService
} from "../../_services";
import {
  getReviewByCustomerIDAndMovieIDAxios,
  addRating,
  editRating
} from "../../requests/reviewRequests";
import {message} from "antd";
import {withRouter} from "react-router-dom";

import {ReviewContext} from '../../reducers/hookReducers/ReviewStore';
import {ADD_REVIEW, EDIT_REVIEW, GET_REVIEWS_BY_MOVIES_ID} from '../../reducers/hookReducers/types';
import {getReviewByMovieIDAxios} from '../../requests';

function RateMovieModal(props) {

  const [reviewState, reviewDispatch] = useContext(ReviewContext);

  const [visible, setVisible] = useState(false);
  const [grading, setGrading] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [reviewID, setReviewID] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setvalue] = useState(props.value ? props.value : false);

  useEffect(() => {
    (async () => {
      let {movieID} = props;
      const currentUser = authenticationService.currentUserValue;
  
      if (!currentUser) {
        return;
      }
  
      const customerID = currentUser._id;
  
      const review = await getReviewByCustomerIDAndMovieIDAxios(movieID, customerID);
  
      const loggedIn = true;
  
      if (!review) {
        setLoggedIn(loggedIn);
      } else {
        if (review || !isObjectEmpty(review)) {
          setGrading(review.rate);
          setIsRated(true);
          setReviewID(review._id);
          setLoggedIn(loggedIn);
          setLoading(false);
        }
      }
    })();
  }, [])

  const showModal = () => {
    if (!loggedIn && !loading) {
      //props.history.push("/sign-in");
      message.error("You can rate after logging in");
      setVisible(false);
    }

    setVisible(true);
  };

  const changeGrading = (grading) => {
    setGrading(grading);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const {movieID} = props;
    const currentUser = authenticationService.currentUserValue;
    if (grading === 0) {
      return message.error("Please select a grade for the film");
    }
    if (!currentUser) {
      return;
    }
    const customerID = currentUser._id;

    if (isRated) {
      const updatedRating = await editRating(reviewID, {movieID, grading, customerID});

      reviewDispatch({
        type: EDIT_REVIEW,
        payload: {
          review: updatedRating
        }
      })

      setVisible(false);
      setIsRated(true);

    } else {
      const newRating = await addRating({movieID, grading, customerID});

      reviewDispatch({
        type: ADD_REVIEW,
        payload: {
          review: newRating
        }
      })

      setVisible(false);
      setIsRated(true);
      setReviewID(newRating._id);
    }

    const rates = await getReviewByMovieIDAxios(movieID);
    reviewDispatch({
      type: GET_REVIEWS_BY_MOVIES_ID,
      payload: {
        rates
      }
    });

  }

  const handleCancel = e => {
    setVisible(false);
  };

  const renderStarWidget = () => {
    const starInputs = () => {
      let ans = [];
      for (let index = 1; index <= 5; index++) {
        if (index === grading && isRated) {
          ans.push(
            <React.Fragment key={`rate-${index}`}>
              <input type="radio" onChange={() => changeGrading(index)} name="grading" id={`rate-${index}`} checked/>
              <label htmlFor={`rate-${index}`} className="fas fa-star"></label>
            </React.Fragment>
          )
        } else {
          ans.push(
            <React.Fragment key={`rate-${index}`}>
              <input type="radio" onChange={() => changeGrading(index)} name="grading" id={`rate-${index}`}/>
              <label htmlFor={`rate-${index}`} className="fas fa-star"></label>
            </React.Fragment>
          )
        }
      }
      return ans.reverse();
    }

    return (
      <div className="star-widget-container">
        <div className="star-widget">
          {starInputs()}
          <div>
            <header></header>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="util-btn rate-btn" onClick={showModal}>
          <div className="icon">
              <span class="material-icons">
                  star_rate
              </span>
          </div>
          <p>Rate Now</p>
      </div>
      <Modal
        title="Rate the Movie"
        visible={visible}
        onOk={null}
        onCancel={handleCancel}
        okButtonProps={{style: {display: "none"}}}
      >
        <form onSubmit={onSubmit}>
          {renderStarWidget()}
          <div style={{marginBottom: "20px", marginTop: "20px"}}></div>
          <button type="submit" className="btn btn-block btn-primary">RATE</button>
        </form>
      </Modal>
    </>
  );
}

export default RateMovieModal;