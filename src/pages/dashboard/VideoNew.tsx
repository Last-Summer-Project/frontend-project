import img2 from "~/assets/img/video.png";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { latest, request } from "~/app/slices/timelapse";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useInterval from "~/components/useInterval";
import { DASHBOARD, LANDING } from "~/const/url";
import { detectedPerDay } from "~/app/slices/log";
import { Form } from "react-bootstrap";
import { isFulfilled } from "@reduxjs/toolkit";

const VideoNew = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const { timelapse } = useAppSelector(state => state.timelapse);
  const { logs } = useAppSelector(state => state.log);

  const dispatch = useAppDispatch();

  let today = new Date();
  let min = (
    logs?.[(logs?.length ?? 1) - 1]?.timestamp ?? "2023-05-30T00:00:00.000Z"
  ).split("T")[0];
  let max = new Date(
    new Date(logs?.[0]?.timestamp ?? today.getTime()).getTime() + 86400000
  )
    .toISOString()
    .split("T")[0];

  const [startDate, setStartDate] = useState(min);
  const [endDate, setEndDate] = useState(max);

  useEffect(() => {
    dispatch(latest());
    dispatch(detectedPerDay());
  }, [dispatch]);

  useInterval(
    () => {
      // If timelapse is there and not done.
      if ((timelapse?.id ?? 0) > 0 && timelapse?.status !== "DONE") {
        navigate(DASHBOARD.VIDEO);
      }
    },
    timelapse?.result === undefined ? 500 : null
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const deviceId = user?.deviceId
    if (deviceId === undefined) {
      navigate(LANDING);
      return;
    }

    dispatch(request({
      deviceId,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    })).unwrap().then((isFulfilled) => {
      if (isFulfilled.timelapse?.id ?? -1 > 0 ) navigate(DASHBOARD.VIDEO)
    })
  };

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

            <div style={{ height: "4rem" }}>
              <img
                src={img2}
                className="mainbode"
                style={{
                  top: "10px",
                  display: "inline-block",
                  position: "relative",
                  margin: "0 0 -10px 1100px",
                  height: "70px",
                  zIndex: 1
                }}
              ></img>
            </div>
          </div>
        </nav>

        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6 className="w-10 omyu" style={{ fontSize: 20 }}>
                    영상 제작
                  </h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <div className="table align-items-center justify-content-center">
                      <Form onSubmit={handleSubmit}>
                        <Form.Group
                          className="mb-3"
                          controlId="makeVideo.startDate"
                        >
                          <Form.Label>시작일</Form.Label>
                          <Form.Control
                            type="date"
                            min={min}
                            max={max}
                            defaultValue={min}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="makeVideo.endDate"
                        >
                          <Form.Label>종료일</Form.Label>
                          <Form.Control
                            type="date"
                            min={min}
                            max={max}
                            defaultValue={max}
                          />
                        </Form.Group>

                        <button
                          type="submit"
                          className="btn bg-gradient-info w-auto my-4 mb-2 omyu-important"
                          style={{
                            fontSize: "15px",
                            zIndex: 1,
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "20px"
                          }}
                        >
                          제작 시작
                        </button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default VideoNew;
