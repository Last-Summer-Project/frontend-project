import img2 from "~/assets/img/video.png";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { latest, request } from "~/app/slices/timelapse";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useInterval from "~/components/useInterval";
import { DASHBOARD, LANDING } from "~/const/url";
import { detectedPerDay } from "~/app/slices/log";
import { DISABLED_HEAVY_SERVER_WORK } from "~/const/shared";
import { Spin } from "antd";
import NewForm from "~/components/Video/NewForm";
import { Alert } from "react-bootstrap";

const VideoNew = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { timelapse } = useAppSelector((state) => state.timelapse);

  const dispatch = useAppDispatch();

  const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const [minDate, setMinDate] = useState("1970-01-01");
  const [maxDate, setMaxDate] = useState(tomorrow.toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  useEffect(() => {
    dispatch(latest());
    dispatch(detectedPerDay())
      .unwrap()
      .then((state) => {
        if (state?.logs?.length ?? 0 > 0) {
          const min = (
            state?.logs?.[(state?.logs?.length ?? 1) - 1]?.timestamp ??
            "1970-01-01T00:00:00.000Z"
          ).split("T")[0];
          const _max = new Date(
            state?.logs?.[0]?.timestamp ?? new Date().getTime()
          );
          const max = new Date(_max.getTime() + 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0];
          setMinDate(min);
          setStartDate(min);
          setMaxDate(max);
          setEndDate(max);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setError("Failed to load detection logs");
        }
      });
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
    if (DISABLED_HEAVY_SERVER_WORK) return;

    const deviceId = user?.deviceId;
    if (deviceId === undefined) {
      navigate(LANDING);
      return;
    }

    dispatch(
      request({
        deviceId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      })
    )
      .unwrap()
      .then((isFulfilled) => {
        if (isFulfilled.timelapse?.id ?? -1 > 0) navigate(DASHBOARD.VIDEO);
      });
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
                  zIndex: 1,
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
                      <Spin spinning={isLoading}>
                        <Alert
                          variant="danger"
                          onClose={() => setError("")}
                          dismissible
                          show={!!error}
                        >
                          <Alert.Heading>
                            Oh snap! You got an error!
                          </Alert.Heading>
                          <p>{error}</p>
                        </Alert>

                        {!isLoading && (
                          <NewForm
                            onSubmit={handleSubmit}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            min={minDate}
                            max={maxDate}
                          />
                        )}
                      </Spin>
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
