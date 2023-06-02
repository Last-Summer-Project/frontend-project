import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "bootstrap";

import { DASHBOARD } from "~/const/url";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { login } from "~/app/slices/auth";
import { setMessage, clearMessage } from "~/app/slices/message";
import { checkLoggedIn } from "~/app/utils";

import "~/assets/scss/landing.scoped.scss";
import video from "~/assets/bg.mp4";
import logo from "~/assets/logo.png";

const Landing = () => {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAppSelector(state => state.auth);
  const { message } = useAppSelector(state => state.message);

  const dispatch = useAppDispatch();

  const alertRef = useRef<HTMLDivElement>(null);
  const showAlert = () => {
    const alertEle = alertRef.current;
    if (!alertEle) return;
    const bsAlert = new Alert(alertEle);
    alertEle?.classList.add("show");

    // hide alert after 5 seconds
    setTimeout(() => {
      bsAlert.close();
    }, 3000);
  };

  useEffect(() => {
    dispatch(clearMessage());

    checkLoggedIn(auth, dispatch).then(result => {
      if (result) {
        setMessage("Redirecting to dashboard...");
        navigate(DASHBOARD);
      }
    });
  }, [dispatch, auth, navigate]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ loginId, password }))
      .unwrap()
      .then(() => {
        setMessage("Redirecting to dashboard...");
        navigate(DASHBOARD);
      });
  };

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
              </form>
            </div>
          </div>
        </div>
        <div className="py-2">
          <button className="btn btn-warning" onClick={showAlert}>
            Trigger alert
          </button>
          <div className="position-absolute top-0 end-0 m-4">
            <div
              className="alert alert-warning alert-dismissible fade"
              ref={alertRef}
              role="alert"
            >
              {message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
