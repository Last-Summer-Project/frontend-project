import bode from "~/assets/img/mainbode.png";
import Humi from "~/assets/img/humidity.png";
import Temp from "~/assets/img/temperature.png";
import Good from "~/assets/img/Good.png";
import Bad from "~/assets/img/Bad.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import useInterval from "~/components/useInterval";
import { latestDetected } from "~/app/slices/log";
import { useEffect } from "react";
import { DASHBOARD, IMAGE_HOST } from "~/const/url";

const Dashboard = () => {
  const movePage = useNavigate();

  function govideo() {
    movePage(DASHBOARD.VIDEO);
  }

  const { log } = useAppSelector(state => state.log);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(latestDetected());
  }, [dispatch]);

  useInterval(() => {
    dispatch(latestDetected());
  }, 30 * 1000);

  return (
    <>
      <main className="main-content position-relative border-radius-lg ">
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl "
          id="navbarBlur"
          data-scroll="false"
        >
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb"></nav>
            <div
              className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
              id="navbar"
            ></div>
          </div>
        </nav>
      </main>
      .
      <div style={{ height: "2.2rem" }}>
        <img
          src={bode}
          className="mainbode"
          style={{
            top: "-30px",
            display: "inline-block",
            position: "relative",
            margin: "0 0 -10px 1400px",
            height: "70px",
            zIndex: 1
          }}
        ></img>
      </div>
      <div style={{ height: "10rem", width: "1250px", marginLeft: "270px" }}>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6 className="w-10 omyu" style={{ fontSize: 20 }}>
                    대시보드
                  </h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center justify-content-center mb-0"></table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="div-left omyu" style={{ width: "500px" }}>
        <button
          type="button"
          className="btn w-100 my-1 mb-2 omyu"
          style={{
            backgroundColor: "#BAD98B",
            display: "inline-block",
            position: "relative",
            fontSize: "23px",
            zIndex: 1,
            right: "-11rem"
          }}
        >
          모 니 터 링
        </button>
      </div>
      <div className="div-right omyu" style={{ width: "500px" }}>
        <button
          type="button"
          className="btn w-100 my-1 mb-2 omyu"
          style={{
            backgroundColor: "#BAD98B",
            display: "inline-block",
            position: "relative",
            fontSize: "23px",
            zIndex: 1,
            left: "11rem"
          }}
        >
          사 진
        </button>
      </div>
      <div className="container-fluid py-4" style={{ float: "left" }}>
        <div style={{ height: "3rem" }}></div>

        <div
          className="col-xl-3 col-sm-6 mb-xl-0 mb-4"
          style={{
            width: "500px",
            height: "400px",
            margin: "0 0 0 850px",
            zIndex: 1
          }}
        >
          <div
            className="card"
            style={{
              width: "480px",
              height: "270px",
            }}
          >
            <div className="card-body p-3">
                  <img
                    src={IMAGE_HOST + log?.imageUrl}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  ></img>
                  {/*onclick="location.href='picture.html';추가 예정*/}
            </div>
          </div>
          <div className="right omyu" style={{ right: "0.01px" }}>
            <button
              onClick={govideo}
              type="button"
              className="btn bg-gradient-info w-auto my-4 mb-2 "
              style={{ fontSize: "17px", margin: "0 0 0 380px", zIndex: 1 }}
            >
              영상 페이지
            </button>
          </div>
        </div>

        <div
          className="col-xl-3 col-sm-6 mb-xl-0 mb-4"
          style={{
            marginTop: "-400px",
            marginLeft: "360px",
            width: " 400px",
            height: "100px",
            zIndex: 1
          }}
        >
          <div className="card">
            <div
              className="card-body p-3"
              style={{ width: "400px", height: " 100px" }}
            >
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p
                      className=" mb-0 text-uppercase font-weight-bold w-30 omyu"
                      style={{ fontSize: 20 }}
                    >
                      온도
                    </p>
                    <p className="omyu">{log?.temperature}°C</p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <img
                    src={Temp}
                    style={{ width: "50", height: "50", fill: "currentColor" }}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div
          className="col-xl-3 col-sm-6 mb-xl-0 mb-4"
          style={{
            marginLeft: "360px",
            width: " 400px",
            height: "100px",
            zIndex: 1
          }}
        >
          <div className="card">
            <div
              className="card-body p-3"
              style={{ width: "400px", height: " 100px" }}
            >
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p
                      className=" mb-0 text-uppercase font-weight-bold w-30 omyu"
                      style={{ fontSize: 20 }}
                    >
                      습도
                    </p>
                    <p className="omyu">{log?.humidity}%</p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <img
                    src={Humi}
                    style={{ width: "50", height: "50", fill: "currentColor" }}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div
          className="col-xl-3 col-sm-6 mb-xl-0 mb-4"
          style={{
            marginLeft: "360px",
            width: "400px",
            height: "100px",
            zIndex: 1
          }}
        >
          <div className="card">
            <div
              className="card-body p-3"
              style={{ width: "400px", height: " 100px" }}
            >
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p
                      className=" mb-0 text-uppercase font-weight-bold w-30 omyu"
                      style={{ fontSize: 20 }}
                    >
                      작물 질병
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <img
                    src={log?.detection.result == "0" ? Good : Bad}
                    style={{
                      width: "87px",
                      height: "87px",
                      fill: "currentColor"
                    }}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
