import making from "~/assets/test.mp4";
import img2 from "~/assets/img/video.png";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { latest } from "~/app/slices/timelapse";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import useInterval from "~/components/useInterval";
import { DASHBOARD, VIDEO_HOST } from "~/const/url";
import { convertResponse } from "~/app/api/timelapse";

const Video = () => {
  const navigate = useNavigate();

  const { timelapse } = useAppSelector(state => state.timelapse);
  const videoRef = useRef<HTMLVideoElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const vidSrc =
    timelapse?.status !== "DONE" ? making : VIDEO_HOST + timelapse?.result;

  const dispatch = useAppDispatch();

  const vidLoader = () => {
    videoRef.current?.load();
  };

  useEffect(() => {
    dispatch(latest())
      .unwrap()
      .then(v => {
        if ((v?.timelapse?.id ?? -1) < 1) {
          navigate(DASHBOARD.VIDEO_NEW);
        }
        vidLoader();
      })
      .catch(reason => {
        try {
          const d = reason as ApiResponse<
            TimelapseResponse | TimelapseRequestRaw
          >;
          if (d.httpStatus === 404) {
            navigate(DASHBOARD.VIDEO_NEW);
          }
        } catch (e) {
          console.error(e);
        }
      });
  }, [dispatch, navigate]);

  useInterval(
    () => {
      dispatch(latest());
      vidLoader();
    },
    timelapse?.status === "DONE" ? null : 10 * 1000
  );

  const filename = (_timelapse?: TimelapseResponseRaw) => {
    if(!_timelapse) return "";
    const timelapse = convertResponse(_timelapse)
    return `LastSummer-Timelapse-${timelapse.logStartDate.getMonth()}월_${timelapse.logStartDate.getDate()}일~${timelapse.logStartDate.getMonth()}월_${timelapse.logStartDate.getDate()}일.mp4`
  }

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
                    영상
                  </h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <div className="align-items-center justify-content-center">
                      <video
                        width="720px"
                        height="480px"
                        controls={timelapse?.status === "DONE"}
                        autoPlay
                        loop
                        src={vidSrc}
                        ref={videoRef}
                        style={{
                          display: "block",
                          margin: "0 auto"
                        }}
                      ></video>

                      <div
                        className="text-center align-items-center justify-content-center"
                        style={{ display: "block", margin: "0 auto" }}
                      >
                        <button
                          type="button"
                          hidden={timelapse?.status !== "DONE"}
                          className="btn bg-gradient-info w-auto my-4 mb-2 omyu-important"
                          style={{
                            fontSize: "15px",
                            marginRight: "1vh",
                            zIndex: 1
                          }}
                          onClick={() => navigate(DASHBOARD.VIDEO_NEW)}
                        >
                          새로 제작
                        </button>

                        <button
                          type="button"
                          hidden={timelapse?.status !== "DONE"}
                          className="btn bg-gradient-info w-auto my-4 mb-2 omyu-important"
                          style={{
                            fontSize: "15px",
                            marginLeft: "1vh",
                            zIndex: 1
                          }}
                          onClick={() => linkRef.current?.click()}
                        >
                          다운로드
                        </button>
                        <a download={filename(timelapse)} href={vidSrc} ref={linkRef}/>
                      </div>
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

export default Video;
