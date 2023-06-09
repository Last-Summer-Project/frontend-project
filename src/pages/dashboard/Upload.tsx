import Detect from "~/app/api/detect";
import { useState } from "react";
import UploadPreview from "~/components/UploadPreview";
import { Spin } from "antd";

const VideoNew = () => {
  const [img, setImg] = useState("");
  const [detect, setDetect] = useState<Detection>();
  const [loading, setLoading] = useState(false);

  const handleUpload = () => {
    setLoading(true);
    Detect.request(img).then((res) => {
      setDetect(res.data);
      setLoading(false);
    });
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

  return (
    <>
      <main className="main-content position-relative border-radius-lg ">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div className="card-header pb-0">
                  <h6 className="w-10 omyu" style={{ fontSize: 20 }}>
                    AI 진단 업로드
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
