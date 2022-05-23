import React, { useState, useEffect } from "react";
import ConnectNav from "../components/ConnectNav";
import DashboardNav from "../components/DashboardNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/Stripe";
import { toast } from "react-toastify";
import { sellerHotels, deleteHotel } from "../actions/Hotel";
import SmallCard from "../components/cards/SmallCard";

const DashboardSeller = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSellerHotels();
  }, []);

  const loadSellerHotels = async () => {
    let { data } = await sellerHotels(auth.token);
    setHotels(data);
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res); // get login link
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed, Try again.");
      setLoading(false);
    }
  };

  const createStripeAccount = async () => {
    try {
      window.open("https://dashboard.stripe.com/register", "_blank");
    } catch (error) {
      console.log(error);
      toast.error("Problem in creating stripe account.");
    }
  };

  const handleHotelDelete = (hotelId) => {
    if (!window.confirm("Are you sure want to delete the posted Hotel?"))
      return;
    deleteHotel(auth.token, hotelId).then((res) => {
      toast.success("Hotel Deleted successfully");
      loadSellerHotels();
    });
  };

  const notConnected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <HomeOutlined className="h1" />
            <h4>Setup payouts to post hotel rooms</h4>
            <p className="lead">
              NJ Paradise Hotels partners with stripe to transfer earnings to
              your bank account
            </p>
            <h4>Step 1</h4>
            <button
              disabled={loading}
              onClick={createStripeAccount}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Create Stripe Account"}
            </button>
            <h4>Step 2</h4>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn btn-primary mb-3"
            >
              {loading ? "Processing..." : "Setup Payouts"}
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const Connected = () => (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Hotels</h2>
        </div>
        <div className="col-md-2">
          <Link to="/hotels/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>
      <div className="row">
        {hotels.map((h) => (
          <SmallCard
            key={h.id}
            h={h}
            showViewMoreButton={false}
            owner={true}
            handleHotelDelete={handleHotelDelete}
          />
        ))}
        {/* {JSON.stringify(hotels)} */}
      </div>
    </div>
  );
  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? Connected()
        : notConnected()}
    </>
  );
};

export default DashboardSeller;
