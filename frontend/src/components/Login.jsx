import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <section class="h-auto gradient-custom py-5">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                class="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div class="card-body p-5 text-center">
                  <form onSubmit={onSubmit} class="mb-md-4 mt-md-4 pb-3">
                    <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                    <p class="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        class="form-control form-control-lg"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="email"
                        required
                      />
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        class="form-control form-control-lg"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="password"
                        required
                      />
                    </div>

                    <button
                      class="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>

                  <div>
                    <p class="mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" class="text-white-50 fw-bold">
                        Register
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
