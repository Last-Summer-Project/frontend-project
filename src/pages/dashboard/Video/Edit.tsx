import { useLocation, useNavigate } from "react-router-dom";
import VideoEditor from "~/components/Video/Editor";
import { DASHBOARD } from "~/const/url";

const VideoEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state) navigate(DASHBOARD.VIDEO);

  const { videoId, outputFileName } = state;

  return (
    <>
      <main className="main-content position-relative border-radius-lg ">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6 className="w-10 omyu" style={{ fontSize: 20 }}>
                    영상 편집
                  </h6>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div
                    className="align-items-center justify-content-center m-auto pt-4 pb-4"
                    style={{ width: "60%" }}
                  >
                    <VideoEditor
                      videoUrl={videoId}
                      outputFileName={outputFileName}
                    />
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

export default VideoEdit;
