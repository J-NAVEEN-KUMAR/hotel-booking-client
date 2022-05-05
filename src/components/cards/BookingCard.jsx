import React, { useState } from "react";
import { diffDays } from "../../actions/Hotel";
import { currencyFormatter } from "../../actions/Stripe";
import OrderModal from "./Modals/OrderModal";

const BookingCard = ({ hotel, session, orderedBy }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {hotel.image && hotel.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${hotel._id}`}
                alt="hotel image"
                className="card-image img img-fluid rounded imgSize"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=NJ+Paradise+Hotel"
                alt="default hotel image"
                className="card-image img img-fluid rounded imgSize"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {hotel.title} <br />
                <h5 className="float-right text-primary">
                  {currencyFormatter({
                    amount: hotel.price * 100,
                    currency: "inr",
                  })}
                </h5>
              </h3>
              <p className="alert alert-info">{hotel.location}</p>
              <p className="card-text">{`${hotel.content.substring(
                0,
                200
              )}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(hotel.from, hotel.to)}{" "}
                  {diffDays(hotel.from, hotel.to) <= 1 ? "day" : "days"}
                </span>
              </p>
              <p className="card-text">{hotel.bed} bed(s)</p>
              <p className="card-text">
                Available from {new Date(hotel.from).toLocaleString()}
              </p>

              {showModal && (
                <OrderModal
                  session={session}
                  orderedBy={orderedBy}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}

              <div className="d-flex justify-content-between h4">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowModal(!showModal)}
                >
                  Show Payment Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
