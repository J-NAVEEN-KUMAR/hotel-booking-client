import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const TopNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useHistory();
  console.log(auth);
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    navigate.push("/login");
  };
  return (
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Home
      </Link>

      {auth === null && (
        <>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </>
      )}
      {auth != null && (
        <>
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

          <a className="nav-link pointer" onClick={logout}>
            Logout
          </a>
        </>
      )}
    </div>
  );
};

export default TopNav;
