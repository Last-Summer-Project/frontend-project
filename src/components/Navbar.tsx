import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";

import iconImg from "~/assets/img/icon.png";
import mascotImg from "~/assets/img/mascot.png";
import { DASHBOARD, LOGOUT } from "~/const/url";

const Navbar = () => {
  const selectedIcon: React.ReactNode = (
    <>
      <img
        src={mascotImg}
        className="mascot"
        style={{ display: "inline-block", height: "30px" }}
      ></img>
    </>
  );

  return (
    <>
      <aside
        className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 "
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          ></i>
          <a
            className="navbar-brand m-0"
            target="_blank"
            style={{
              display: "inline-block",
            }}
          >
            <img src={iconImg}></img>
            <span
              className="ms-1 font-weight-bold w-10 omyu"
              style={{ fontSize: 20 }}
            >
              LastSummer
            </span>
          </a>
          <Link
            to={DASHBOARD.UPLOAD}
            className="m-0 p-0 navbar-brand"
            style={{
              display: "inline",
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
        </div>

        <hr className="horizontal dark mt-0"></hr>
        <div
          className="collapse navbar-collapse  w-auto "
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to={DASHBOARD.INDEX}
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      {isActive ? (
                        selectedIcon
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-display"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="nav-link-text ms-1 w-10 omyu"
                      style={{ fontSize: 20 }}
                    >
                      대시보드
                    </span>
                  </>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={DASHBOARD.PICTURE}
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      {isActive ? (
                        selectedIcon
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="currentColor"
                          className="bi bi-camera"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                          <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="nav-link-text ms-1 w-10 omyu"
                      style={{ fontSize: 20 }}
                    >
                      사진페이지
                    </span>
                  </>
                )}
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to={DASHBOARD.SICK}
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      {isActive ? (
                        selectedIcon
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-heart-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      className="nav-link-text ms-1 w-10 omyu"
                      style={{ fontSize: 20 }}
                    >
                      질병페이지
                    </span>
                  </>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={DASHBOARD.VIDEO}
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                      {isActive ? (
                        selectedIcon
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-camera-reels-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                          <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="nav-link-text ms-1 w-10 omyu"
                      style={{ fontSize: 20 }}
                    >
                      영상페이지
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          className="omyu position-absolute top-100 start-50 translate-middle"
          style={{ marginTop: -13, width: 200 }}
        >
          <Link to={LOGOUT}>
            <button
              type="button"
              className="btn btn-success w-100  mb-2"
              style={{ marginTop: -100, fontSize: 15 }}
            >
              로그아웃
            </button>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
