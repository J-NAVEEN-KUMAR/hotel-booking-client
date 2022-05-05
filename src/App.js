import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import TopNav from "./components/TopNav";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./booking/Home";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./Hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";
import EditHotel from "./Hotels/EditHotel";
import ViewHotel from "./Hotels/ViewHotel";
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import SearchResults from "./Hotels/SearchResults";

function App() {
  return (
    <Router>
      <TopNav />
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={DashboardSeller}
        />
        <PrivateRoute exact path="/hotels/new" component={NewHotel} />
        <PrivateRoute
          exact
          path="/stripe/callback"
          component={StripeCallback}
        />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel} />
        <Route exact path="/hotels/:hotelId" component={ViewHotel} />
        <PrivateRoute
          exact
          path="/stripe/success/:hotelId"
          component={StripeSuccess}
        />
        <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
        <Route exact path="/search-result" component={SearchResults} />
      </Switch>
    </Router>
  );
}

export default App;
