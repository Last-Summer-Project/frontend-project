import video from "~/assets/bg.mp4";
import logo from "~/assets/logo.png";
import "~/assets/scss/landing.scoped.scss";

function LandingPage() {
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
                <span>Real-time Smart Farm Updates<br />
                Timelapse Video Production Service</span>
              </div>

              <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                <div className="row input-group-newsletter">
                  <div className="col">
                    <input
                      className="form-control"
                      id="id"
                      type="id"
                      placeholder="ID"
                      aria-label="Enter email address..."
                      data-sb-validations="required,email"
                    />
                  </div>
                  <div className="col">
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="PASSWORD"
                      aria-label="Enter email address..."
                      data-sb-validations="required,email"
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      className="btn btn-primary"
                      id="submitButton"
                      type="submit"
                      onclick="location.href='dashboard.html';"
                    >
                      Login
                    </button>
                  </div>
                </div>

                <div className="d-none" id="submitSuccessMessage">
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
