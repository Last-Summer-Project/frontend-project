import { Link, NavLink } from "react-router-dom";

import iconImg from '~/assets/img/icon.png';
import mascotImg from '~/assets/img/mascot.png';

const Navbar = () => {
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
          <a className="navbar-brand m-0" target="_blank">
            <img src={iconImg}></img>
            <span
              className="ms-1 font-weight-bold w-10 test1"
              style={{ fontSize: 20 }}
            >
              LastSummer
            </span>
          </a>
        </div>

        <hr className="horizontal dark mt-0"></hr>
        <div
          className="collapse navbar-collapse  w-auto "
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  "nav-link" + isActive ? " active" : ""
                }
              >
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <img
                    src={mascotImg}
                    className="mascot"
                    style={{ display: "inline-block", height: "30px" }}
                  ></img>
                  {/*이미지:mascot */}
                </div>
                <span
                  className="nav-link-text ms-1 w-10 test1"
                  style={{ fontSize: 20 }}
                >
                  대시보드
                </span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/dashboard/picture"
                className={({ isActive }) =>
                  "nav-link" + isActive ? " active" : ""
                }
              >
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-camera"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                  </svg>
                </div>
                <span
                  className="nav-link-text ms-1 w-10 test1"
                  style={{ fontSize: 20 }}
                >
                  사진페이지
                </span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/dashboard/sick"
                className={({ isActive }) =>
                  "nav-link" + isActive ? " active" : ""
                }
              >
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                </div>
                <span
                  className="nav-link-text ms-1 w-10 test1"
                  style={{ fontSize: 20 }}
                >
                  질병페이지
                </span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/dashboard/video"
                className={({ isActive }) =>
                  "nav-link" + isActive ? " active" : ""
                }
              >
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
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
                </div>
                <span
                  className="nav-link-text ms-1 w-10 test1"
                  style={{ fontSize: 20 }}
                >
                  영상페이지
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          className=" test1 position-absolute top-100 start-50 translate-middle"
          style={{ marginTop: -13, width: 200 }}
        >
          <Link to="/logout">
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
