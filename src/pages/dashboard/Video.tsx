import video2 from "~/assets/test.mp4";
import img2 from "~/assets/img/video.png";

export default function Video() {
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
                    <div className="table align-items-center justify-content-center mb-0">
                      <video
                        width="720px"
                        height="480px"
                        controls
                        autoPlay
                        style={{ marginLeft: 270 }}
                      >
                        <source src={video2} type="video/mp4" />
                      </video>
                      <button
                        type="button"
                        className="btn bg-gradient-info w-auto my-4 mb-2 "
                        style={{
                          fontSize: "15px",
                          margin: "0 0 0 840px",
                          zIndex: 1
                        }}
                      >
                        다운로드
                      </button>
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
}
