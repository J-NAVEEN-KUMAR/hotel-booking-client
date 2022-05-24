const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <form onSubmit={handleSubmit} className="mt-3">
    <p className="alert alert-info mt-3">
      <p>You can use these credentials to login</p>
      <br />
      <p>Email: jerubandinaveen960@gmail.com</p>
      <br />
      <p>Password: 1234567ui</p>
    </p>
    <div className="form-group m-3">
      <label className="form-label">Email address</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="form-group m-3">
      <label className="form-label">Enter Password</label>
      <input
        type="password"
        className="form-control"
        placeholder="Enter Your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <button disabled={!email || !password} className="btn btn-primary m-3">
      Login
    </button>
  </form>
);

export default LoginForm;
