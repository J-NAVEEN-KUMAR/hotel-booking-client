import { useSelector } from "react-redux";
import { Card, Avatar, Badge } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  getAccountBalance,
  currencyFormatter,
  payoutSetting,
} from "../actions/Stripe";
import { SettingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const { Ribbon } = Badge;
const { Meta } = Card;
const ConnectNav = () => {
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      // console.log(res);
      setBalance(res.data);
    });
  }, []);

  const handlePayoutSetting = async () => {
    setLoading(true);
    try {
      const res = await payoutSetting(auth.token);
      console.log("RESPONSE FOR PAYOUT SETTING LINK", res);
      // window.location.href = res.data;
      toast.warn(res.data);
      setLoading(false);
    } catch (error) {
      // toast.error(error);
    }
  };

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth &&
        auth.user &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled && (
          <>
            <Ribbon text="Available" color="green">
              <Card className="bg-light pt-1">
                {balance &&
                  balance.pending &&
                  balance.pending.map((bp, index) => (
                    <span key={index} className="lead">
                      {currencyFormatter(bp)}
                    </span>
                  ))}
              </Card>
            </Ribbon>
            <Ribbon text="Payouts" color="blue">
              <Card onClick={handlePayoutSetting} className="bg-light pointer">
                <SettingOutlined className="h5 pt-2" />
              </Card>
            </Ribbon>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
