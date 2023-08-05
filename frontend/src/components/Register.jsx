import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import { BackButton } from "./BackButton";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
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

    if (password !== password2) {
      toast.error("password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <section class="h-auto gradient-custom py-5">
        <BackButton url="/login" />
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                class="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div class="card-body p-5 text-center">
                  <form onSubmit={onSubmit} class="mb-md-4 mt-md-4 pb-3">
                    <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
                    <p class="text-white-50 mb-5">
                      Please enter your Register details!
                    </p>
                    <div class="form-outline form-white mb-4">
                      <input
                        type="name"
                        id="typeNameX"
                        name="name"
                        value={name}
                        onChange={onChange}
                        class="form-control form-control-lg"
                        placeholder="username"
                      />
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        name="email"
                        value={email}
                        onChange={onChange}
                        class="form-control form-control-lg"
                        placeholder="email"
                      />
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        name="password"
                        value={password}
                        onChange={onChange}
                        class="form-control form-control-lg"
                        placeholder="password"
                      />
                    </div>
                    <div class="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        class="form-control form-control-lg"
                        placeholder="Confirm password"
                      />
                    </div>

                    <button
                      class="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
