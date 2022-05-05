const RegisterForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <form onSubmit={handleSubmit} className="mt-3">
    <div className="form-group m-3">
      <label className="form-label ">Your Name</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
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
    <button
      disabled={!email || !password || !name}
      className="btn btn-primary m-3"
    >
      Register
    </button>
  </form>
);

export default RegisterForm;
