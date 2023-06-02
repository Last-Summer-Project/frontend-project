import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { login } from "~/app/slices/auth";
import { clearMessage } from "~/app/slices/message";
import video from "~/assets/bg.mp4";
import logo from "~/assets/logo.png";
import "~/assets/scss/landing.scoped.scss";
import { DASHBOARD } from "~/const/url";

const Landing = () => {
  let navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn } = useAppSelector(state => state.auth);
  const { message } = useAppSelector(state => state.message);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ loginId, password }))
      .unwrap()
      .then(() => {
        navigate(DASHBOARD);
        // window.location.reload()
      });
  };

  if (isLoggedIn) {
    return <Navigate to={DASHBOARD} />;
  }

  return (
    <>
      <div id="LandingPage">
        <video className="bg-video" playsInline autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
        <div className="masthead">
          <div className="masthead-content text-white">
            <div className="container-fluid px-4 px-lg-0">
              <div className="d-flex justify-content-center">
                <img src={logo} alt="logo" />
              </div>

              <div className="mb-4 text-center">
                <span>
                  Real-time Smart Farm Updates
                  <br />
                  Timelapse Video Production Service
                </span>
              </div>

              <form id="contactForm" onSubmit={handleLogin}>
                <div className="row input-group-newsletter">
                  <div className="col">
                    <input
                      className="form-control"
                      id="loginId"
                      name="loginId"
                      type="id"
                      placeholder="ID"
                      aria-label="Enter Login ID..."
                      onChange={event => setLoginId(event.target.value)}
                    />
                  </div>
                  <div className="col">
                    <input
                      className="form-control"
                      id="password"
                      name="password"
                      type="password"
                      placeholder="PASSWORD"
                      aria-label="Enter password..."
                      onChange={event => setPassword(event.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      className="btn btn-primary"
                      id="submitButton"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </div>

                {/* <div className="d-none" id="submitSuccessMessage">
                    <div className="text-center mb-3 mt-2">
                      <div className="fw-bolder" style={{ fontSize: 20 }}>
                        Form submission successful!
                      </div>
                      To activate this form, sign up at
                      <br />
                      <span href="https://startbootstrap.com/solution/contact-forms"></span>
                    </div>
                  </div>

                  <div className="d-none" id="submitErrorMessage">
                    <div
                      className="text-center text-danger mb-3 mt-2 test1"
                      style={{ fontSize: 20 }}
                    >
                      Error sending message!
                    </div>
                  </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
