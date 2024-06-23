import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUser = useSelector((state) => state.auth.allUser);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  console.log("data", data);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = allUser.find((el) => el.email === data.email);
    if (user && user.password === data.password) {
      dispatch(setCurrentUser(user));
      navigate("/");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" onChange={handleChange} />
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">SignUp</Link>
    </>
  );
};

export default Login;
