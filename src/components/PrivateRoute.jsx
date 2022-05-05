import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));
  return auth && auth.token ? (
    <Switch>
      <Route {...rest} />
    </Switch>
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
