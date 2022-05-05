import React from "react";
import { diffDays } from "../../actions/Hotel";
import { currencyFormatter } from "../../actions/Stripe";
import { Link, useHistory } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const SmallCard = ({
  h,
  handleHotelDelete = (f) => f,
  owner = false,
  showViewMoreButton = true,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            {h.image && h.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
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
                {h.title}{" "}
                <br />
                <h5 className="float-right text-primary">
                  {currencyFormatter({
                    amount: h.price * 100,
                    currency: "inr",
                  })}
                </h5>
              </h3>
              <p className="alert alert-info">{h.location}</p>
              <p className="card-text">{`${h.content.substring(0, 200)}...`}</p>
              <p className="card-text">
                <span className="float-right text-primary">
                  for {diffDays(h.from, h.to)}{" "}
                  {diffDays(h.from, h.to) <= 1 ? "day" : "days"}
                </span>
              </p>
              <p className="card-text">{h.bed} bed(s)</p>
              <p className="card-text">
                Available from {new Date(h.from).toLocaleString()}
              </p>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && <button
                  className="btn btn-primary"
                  onClick={() => history.push(`/hotels/${h._id}`)}
                >
                  Show More
                </button>}
                {owner && (
                  <>
                    <Link to={`/hotel/edit/${h._id}`}>
                      <EditOutlined className="text-warning" />
                    </Link>
                    <DeleteOutlined
                      className="text-danger"
                      onClick={() => handleHotelDelete(h._id)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
