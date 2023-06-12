import img2 from "~/assets/img/video.png";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { clear, request } from "~/app/slices/detect";
import { useEffect, useState } from "react";
import UploadPreview from "~/components/UploadPreview";
import { Spin } from "antd";

const VideoNew = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { detect } = useAppSelector((state) => state.detect);

  const handleUpload = () => {
    setLoading(true);
    dispatch(request(img)).then(() => setLoading(false));
  };

  const switchCase = (input: string) => {
    switch (input) {
      case "0":
        return "정상 입니다.";
      case "1":
        return "상추균핵병 입니다.";
      case "2":
        return "상추노균병 입니다.";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    return () => {
      clear();
    };
  });

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
                  <div
                    className="align-items-center justify-content-center m-auto pt-4 pb-4"
                    style={{ width: "60%" }}
                  >
                    <Spin spinning={loading}>
                      <UploadPreview onImgChange={setImg} />
                      <div>
                        <button
                          className="download"
                          onClick={handleUpload}
                          disabled={!img}
                        >
                          Upload & Predict
                        </button>
                      </div>
                      {detect?.result && (
                        <h6>Result : {switchCase(detect.result)}</h6>
                      )}
                    </Spin>
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
